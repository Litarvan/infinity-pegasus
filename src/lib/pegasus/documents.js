import { fetchHtml } from './index.js';

export const MARKS_DOCUMENT = 'Relevé de notes';
export const REPORT_DOCUMENT = 'Bulletin de notes';

let documents;

export async function getDocuments()
{
    if (documents) {
        return documents;
    }

    const result = [];

    const categories = await fetchHtml('editions', 'load-editions').then(d => d.querySelectorAll('#content-list-editions'));
    for (const category of categories) {
        const hasFilter = !!category.querySelector('#div-filter');
        const documents = category.querySelectorAll('form');

        for (const d of documents) {
            result.push({
                name: d.querySelector('.libelle-edition .texte').innerText.trim(),
                url: d.action,
                method: d.method.toUpperCase(),
                params: Object.fromEntries([...d.querySelectorAll('input')].map(({ name, value }) => [name, value])),

                async fetchFilters() {
                    return hasFilter ? getFilters(this) : [];
                },
                async fetchBlob(filters) {
                    return getBlob(this, filters);
                }
            });
        }
    }

    return documents = result;
}

export async function downloadDocument(doc, filters)
{
    const documents = await getDocuments();
    const blob = await getBlob(documents.find(d => d.name === doc), filters);

    open(URL.createObjectURL(blob), '_blank');
}

async function getFilters(document)
{
    if (document.__filters) {
        return document.__filters;
    }

    const filters = [];

    const selects = await fetchHtml('editions', 'load-filter', document.params).then(d => d.querySelectorAll('select'));
    for (const select of selects) {
        let parent = select.parentElement;
        if (parent.tagName.toLowerCase() === 'div') {
            parent = parent.parentElement;
        }

        filters.push({
            id: select.id,
            name: parent.previousElementSibling.querySelector('label').innerText.replace(':', '').trim(),
            values: [...select.querySelectorAll('option')].map(({ value, innerText }) => ({
                name: innerText.replaceAll(/([( ]) /g, '$1'),
                value
            })).reverse()
        });
    }

    return document.__filters = filters;
}

async function getBlob(document, filters = {})
{
    return fetch(document.url, {
        method: document.method,
        body: new URLSearchParams({ ...document.params, ...filters })
    }).then(r => r.blob());
}
