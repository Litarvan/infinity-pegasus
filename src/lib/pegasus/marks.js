import { getDocuments } from './documents';

const MODULE_REGEX = /(((.*) - )|(\[(.*)] ))?(.*) \[ *(.*) ECTS]/;
const MARK_REGEX = /\d+,\d\d/g;
const MARKS_DOCUMENT = 'Relevé de notes';

async function getMarksDocument()
{
    const documents = await getDocuments();
    return documents.find(d => d.name === MARKS_DOCUMENT);
}

export async function getMarksFilters()
{
    return getMarksDocument().then(d => d.fetchFilters());
}

export async function getMarks(filters, wasSus)
{
    const blob = await fetchMarksPDF(filters);

    const pdfjs = window['pdfjs-dist/build/pdf'];
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const doc = await pdfjs.getDocument({ url: URL.createObjectURL(blob) }).promise;
    const result = [];

    for (let i = 1; i <= doc.numPages; i++) {
        await parsePage(await doc.getPage(i), result);
    }

    // Sometimes, Pegasus produces a PDF with no marks (except for averages), if this happens, we'll try again (only once).
    let hasAnyMark = false;
    main:
    for (const module of result) {
        for (const subject of module.subjects) {
            for (const mark of subject.marks) {
                if (mark.value !== undefined) {
                    hasAnyMark = true;
                    break main;
                }
            }
        }
    }
    if (!hasAnyMark && !wasSus) {
        return getMarks(filters, true);
    }

    return result;
}

async function fetchMarksPDF(filters)
{
    const marks = await getMarksDocument();
    return marks.fetchBlob(filters);
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
            const [,,, id,, idBrackets, name, credits] = texts[i++].match(MODULE_REGEX);
            const subjects = [];

            while (texts[i] !== 'Niveau') {
                const [subject, ni] = parseSubject(texts, i);

                subjects.push(subject);
                i = ni;
            }

            result.push({ id: id || idBrackets, name, credits: parseFloat(credits), subjects })
        }
    }
}

function parseSubject(texts, i)
{
    const name = texts[i++];
    const id = texts[i++];
    const marks = [];

    let nextMarkId = 0;
    while (i < texts.length && (texts[i].match(MARK_REGEX) || isMarkCode(texts[i + 1]))) {
        const mark = { id: nextMarkId++ };
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
