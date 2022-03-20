import { getDocuments } from './documents';

const MODULE_REGEX = /((.*) - )?(.*) \[ *(.*) ECTS]/;
const MARK_REGEX = /\d+,\d\d/g;

export async function getMarks()
{
    console.log('[Marks.JS] Fetching marks PDF...');
    const blob = await fetchMarksPDF();

    console.log('[Marks.JS] Parsing marks PDF');

    const pdfjs = window['pdfjs-dist/build/pdf'];
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const doc = await pdfjs.getDocument({ url: URL.createObjectURL(blob) }).promise;
    const result = [];

    for (let i = 1; i <= doc.numPages; i++) {
        console.log(`[Marks.JS] Parsing PDF page #${i}`);
        await parsePage(await doc.getPage(i), result);
    }

    console.log('[Marks.JS] Finished parsing marks');

    return result;
}

async function fetchMarksPDF()
{
    const marks = (await getDocuments()).find(d => d.name === 'Relevé de notes');
    const filters = await marks.fetchFilters();

    // TODO: Select!

    return marks.fetchBlob(Object.fromEntries(filters.map(f => [f.id, (f.values.find(v => v.name === '2021' || v.name.includes('STAGE')) || f.values[0]).value])));
}

async function parsePage(page, result)
{
    const content = await page.getTextContent();
    const texts = content.items.filter(i => !i.hasEOL).map(i => i.str);

    let i = 0;

    while (i < texts.length) {
        while (i < texts.length && !texts[i].match(MODULE_REGEX)) {
            i++;
        }

        while (i < texts.length && texts[i].match(MODULE_REGEX)) {
            const [,, id, name, credits] = texts[i++].match(MODULE_REGEX);
            const subjects = [];

            while (texts[i] !== 'Niveau') {
                const [subject, ni] = parseSubject(texts, i);

                subjects.push(subject);
                i = ni;
            }

            result.push({ id, name, credits: parseFloat(credits), subjects })
        }
    }
}

function parseSubject(texts, i)
{
    const name = texts[i++];
    const id = texts[i++];
    const marks = [];

    while (i < texts.length && (texts[i].match(MARK_REGEX) || isMarkCode(texts[i + 1]))) {
        const mark = {};
        if (texts[i].match(MARK_REGEX)) {
            mark.average = parseMark(texts[i++]);
        }
        if (texts[i].match(MARK_REGEX)) {
            mark.value = parseMark(texts[i++]);
        }

        const markName = texts[i++];
        if (isMarkCode(markName)) {
            mark.name = 'Note';
        } else {
            mark.name = markName;
            i++;
        }

        marks.push(mark);
    }

    return [{ name, id, marks }, i];
}

function parseMark(mark)
{
    return parseFloat(mark.replace(',', '.'));
}

function isMarkCode(code)
{
    return code.match(/^[A-Z]+$/) && code.length > 5;
}
