import { progress } from '../stores';

import { computeAverages, normalizeCoefficients } from './coefficients';
import { getDocuments, MARKS_DOCUMENT, REPORT_DOCUMENT } from './documents';

// Supports notably:
// - 'ID - Module name [X ECTS]'
// - '[ID] Module name [X ECTS]'
// - '[ID] - Module name [X ECTS]'
// - '[ID]-Module name [X ECTS]'
// - 'ID Module name [X ECTS]'
// - 'ID_Module name [X ECTS]'
const MODULE_REGEX = /(?:\[(.+)\] |(.+)_|(.+) - |\[(.+)\] - |\[(.+)\]-|([A-Z0-1]+) )?(.*) +\[ *(.*) ECTS\]/;
const MARK_REGEX = /\d+,\d\d/g;
const POSITION_THRESHOLD = 5;

export async function getMarksFilters()
{
    // S[1-3] reports PDFs sucks A LOT, can't be parsed, and takes a ton of time to fetch, so I filter them out.
    const documents = await getDocuments();
    const [year, semester] = await documents.find(d => d.name === MARKS_DOCUMENT).fetchFilters();
    semester.values = semester.values.filter(v => !v.name.includes('Prépa'));
    year.values = year.values.filter(v => semester.values.find(vv => vv.year === v.value));

    return [year, semester];
}

export async function getMarks(filters, noReport)
{
    const blob = await fetchMarksPDF(filters, !noReport);

    progress.set(`reading.${noReport ? 'summary' : 'report'}`);

    const pdfjs = window['pdfjs-dist/build/pdf'];
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const doc = await pdfjs.getDocument({ url: URL.createObjectURL(blob) }).promise;
    const result = [];
    let averages;

    for (let i = 1; i <= doc.numPages && typeof averages?.average !== 'number'; i++) {
        if (!(averages = await parsePage(await doc.getPage(i), result, !noReport)) && !noReport) {
            return getMarks(filters, true);
        }
    }

    if (noReport) {
        averages = computeAverages(filters, result);
    }

    normalizeCoefficients(result);

    return { ...averages, fromReport: !noReport, marks: result };
}

async function fetchMarksPDF(filters, report)
{
    const documents = await getDocuments();
    const marks = documents.find(d => d.name === (report ? REPORT_DOCUMENT : MARKS_DOCUMENT));

    progress.set(`fetching.${(report ? 'report' : 'summary')}`);
    return marks.fetchBlob(filters);
}

async function parsePage(page, result, report)
{
    const content = await page.getTextContent();
    const elements = content.items.filter(i => !i.hasEOL).sort((a, b) => {
        const dy = a.transform[6] - b.transform[6];
        if (dy === 0) {
            return a.transform[5] - b.transform[5];
        }

        return dy;
    });
    const texts = elements.map(i => i.str);

    if (!texts[0] || texts[0] === "L'édition de ce document n'a pas encore été autorisée par la pédagogie.") {
        return false;
    }

    let average, classAverage;
    let i = 0;

    while (i < texts.length) {
        while (i < texts.length && !texts[i].match(MODULE_REGEX)) {
            if (texts[i++] === 'Moyenne du semestre de la promotion') {
                average = parseMark(texts[i++]);
                classAverage = parseMark(texts[i++]);
            }
        }

        while (i < texts.length && texts[i].match(MODULE_REGEX)) {
            let id, name, credits

            const regexGroups = texts[i++].match(MODULE_REGEX).filter(s => !!s);

            if (regexGroups.length == 3)
                [, name, credits] = regexGroups;
            else
                [, id, name, credits] = regexGroups;

            const subjects = [];
            let grade, average, classAverage;

            if (report) {
                i++;
                grade = texts[i++];
                classAverage = parseMark(texts[i++]);
                average = parseMark(texts[i++]);
            }

            while (i < texts.length && texts[i] !== 'Niveau') {
                const [subject, ni] = parseSubject(elements, texts, i, report);

                subjects.push(subject);
                i = ni;
            }

            result.push({ id, name, credits: parseFloat(credits), grade, average, classAverage, subjects });
        }
    }

    return { average, classAverage };
}

function parseSubject(elements, texts, i, report)
{
    const name = texts[i++];
    const id = texts[i++];
    let grade, average, classAverage, coefficient;
    const marks = [];

    if (report) {
        i++;
        grade = texts[i++];
        average = parseMark(texts[i++]);
        i++;
        classAverage = parseMark(texts[i++]);
        coefficient = parseMark(texts[i++]);
    }

    let nextMarkId = 0;
    while (i < texts.length && (texts[i].match(MARK_REGEX) || (i + 1 < texts.length && isMarkCode(elements[i + 1])) || /* Nothing but the code */ elements[i].transform[4] === 94)) {
        const mark = { id: nextMarkId++ };
        if (texts[i].match(MARK_REGEX)) {
            mark.classAverage = parseMark(texts[i++]);
        }
        const delta = (a, b) => Math.abs(a - b);
        const x = elements[i - 1].transform[4];
        if (delta(x, 464) < delta(x, 506)) { // This means there is no average, only a mark, this can rarely happen
            mark.value = mark.classAverage;
            delete mark.classAverage;
        } else if (texts[i].match(MARK_REGEX)) {
            mark.value = parseMark(texts[i++]);
        }
        if (report) {
            mark.coefficient = parseMark(texts[i++]);
        }

        mark.name = texts[i++];
        if (isMarkCode(elements[i - 1])) {
            mark.name = 'Note';
        } else {
            i++;
        }
       
        marks.push(mark);
    }

    return [{ name, id, grade, average, classAverage, coefficient, marks }, i];
}

function parseMark(mark)
{
    return parseFloat(mark.replace(',', '.'));
}

function isMarkCode(element)
{
    return element.transform[4] === 94;
}
