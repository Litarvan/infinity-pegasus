// This method actually sucks, original page is first loaded and displayed before being replaced by ours.
// Since Chrome never implemented webRequest.filterResponseData (that we use on firefox), there is sadly no better way.

const DEBUG = true;

const INFINITY_PEGASUS_URL = DEBUG ? 'http://localhost:5000/' : 'https://api.pegasus.infinity.study/';
const PDF_JS_VERSION = '2.11.338';

async function init()
{
    const { disabled } = await browser.storage.local.get(['disabled']);
    if (disabled) {
        return;
    }

    const pegasus = document.documentElement.innerHTML.replaceAll('&amp;', '&');
    document.documentElement.innerHTML = await fetch(INFINITY_PEGASUS_URL).then(r => r.text());

    [
        { content: `window.pegasus = ${JSON.stringify(pegasus.replace(/<\/script>/g, ''))};` },
        { url: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.min.js` },
        { url: document.querySelector('script[crossorigin]').src, module: true }
    ].forEach(addScript);
}

function addScript({ url, content, module })
{
    const element = document.createElement('script');
    element.type = 'text/javascript';
    element.crossorigin = 'anonymous';

    if (content) {
        element.appendChild(document.createTextNode(content));
    } else {
        if (module) {
            element.type = 'module';
        }

        element.src = url;
    }

    document.body.appendChild(element);
}

init().catch(err => {
    console.error('Error during Infinity Pegasus injection!');
    console.error(err);
})
