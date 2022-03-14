// TODO: Better regexes

const MODULE_REGEX = /((.*) - )?(.*) \[ *(.*) ECTS]/;
const MARK_REGEX = /\d+,\d\d/g;

export function isLogged()
{
    return !!getLogoutURL();
}

export function getName()
{
    return getMatch(
        /<td class="text hidden-phone " ?>([^<]*)<\/td>/,
        1,
        n => n.replace('&nbsp;', ' ')
    );
}

export function getLogoutURL()
{
    return getMatch(/index\.php\?com=login&job=disconnect-user&token=[^"]*/);
}

export async function getMarks()
{
    const blob = await fetchMarksPDF();

    const pdfjs = window['pdfjs-dist/build/pdf'];
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const doc = await pdfjs.getDocument({ url: URL.createObjectURL(blob) }).promise;
    const page = await doc.getPage(1);
    const content = await page.getTextContent();

    const texts = content.items.filter(i => !i.hasEOL).map(i => i.str);

    const result = [];
    let i = 0;

    while (i < texts.length)
    {
        while (i < texts.length && !texts[i].match(MODULE_REGEX))
        {
            i++;
        }

        while (i < texts.length && texts[i].match(MODULE_REGEX))
        {
            const [,, id, name, credits] = texts[i++].match(MODULE_REGEX);
            const subjects = [];

            while (texts[i] !== 'Niveau')
            {
                const [subject, ni] = parseSubject(texts, i);

                subjects.push(subject);
                i = ni;
            }

            result.push({ id, name, credits: parseFloat(credits), subjects })
        }
    }

    return result;
}

function parseSubject(texts, i)
{
    const name = texts[i++];
    const id = texts[i++];
    const marks = [];

    while (i < texts.length && (texts[i].match(MARK_REGEX) || texts[i + 1] === 'CONTROLE'))
    {
        const mark = {};
        if (texts[i].match(MARK_REGEX))
        {
            mark.average = parseMark(texts[i++]);
        }
        if (texts[i].match(MARK_REGEX))
        {
            mark.value = parseMark(texts[i++]);
        }


        mark.name = texts[i++];

        marks.push(mark);
        i++; // 'CONTROLE'
    }

    return [{ name, id, marks }, i];
}

function parseMark(mark)
{
    return parseFloat(mark.replace(',', '.'));
}

async function fetchMarksPDF()
{
    // TODO: Save if those were run
    await fetch('https://inge-etud.epita.net/pegasus/index.php?com=editions&job=load-editions');
    await fetch('https://inge-etud.epita.net/pegasus/index.php?com=editions&job=load-filter', {
        method: 'POST',
        body: new URLSearchParams({
            filtername: "flt-bulletin-de-notes-ing",
            uri: "/reports/REPORT_UNIT_EPI/EPI_bulletin_de_notes_semestre_ING:0",
            reporttitle: "Relevé+de+notes",
            format: "PDF",
            reporttype: "type_1"
        })
    });

    return fetch('https://inge-etud.epita.net/pegasus/index.php?com=report&job=execute-report', {
        method: 'POST',
        body: new URLSearchParams({
            PARAM_annee: "2021",
            PARAM_produit:  "SI5                 21",
            PARAM_etudiant: "NAVRATIL            ADRIEN",
            format: "PDF",
            uri: "/reports/REPORT_UNIT_EPI/EPI_bulletin_de_notes_semestre_ING:0"
        })
    }).then(r => r.blob());
}

function getMatch(pattern, group, modifier)
{
    if (typeof group == 'function') {
        modifier = group;
        group = null;
    }

    const match = getOriginalContent().match(pattern);
    return match && (modifier || (s => s))(match[group || 0]);
}

function getOriginalContent()
{
    return window.pegasus || document.querySelector('#pegasus-original-content').innerText;
}
