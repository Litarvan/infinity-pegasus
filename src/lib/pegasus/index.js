const pegasusContent = window.pegasus || document.querySelector('#pegasus-original-content').innerText;

const PEGASUS_ROOT = `https://inge-etud.epita.net/pegasus`;
export const PEGASUS_AUTH_URL = `${PEGASUS_ROOT}/o365Auth.php`;

export function getMatch(pattern, group, modifier)
{
    if (typeof group == 'function') {
        modifier = group;
        group = null;
    }

    const match = pegasusContent.match(pattern);
    return match && (modifier || (s => s))(match[group || 0]);
}

export async function fetchHtml(com, job, params = {})
{
    const text = await fetch(`${PEGASUS_ROOT}/index.php?com=${com}&job=${job}`, {
        method: 'POST',
        body: new URLSearchParams(params)
    })
        .then(r => r.arrayBuffer())
        .then(r => new TextDecoder('ISO-8859-15').decode(r));

    return new DOMParser().parseFromString(text, 'text/html');
}
