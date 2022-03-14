const DEBUG = false;

const PEGASUS_HOST = 'inge-etud.epita.net';
const PEGASUS_URL = `https://${PEGASUS_HOST}/`;
const PEGASUS_FILTER = `*://${PEGASUS_HOST}/*`;
const PEGASUS_ROOT = PEGASUS_URL + 'pegasus/';
const PEGASUS_PAGE = PEGASUS_ROOT + 'index.php';

const PDF_JS_VERSION = '2.11.338';

// We have no choice but to embed the html, since we can't use `fetch` here (well, I didn't manage to at least)
const INFINITY_PEGASUS_URL = DEBUG ? 'http://localhost:3000/' : 'https://api.pegasus.infinity.study/';
const INFINITY_PEGASUS_HTML = `<!DOCTYPE html>
<html lang="fr">
  <head>
    ${DEBUG ? '<script type="module" src="/@vite/client"></script>' : ''}

    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Infinity Pegasus</title>
    
    ${DEBUG ? '' : `
        <script type="module" crossorigin src="/assets/index.js"></script>
        <link rel="modulepreload" href="/assets/vendor.js">
        <link rel="stylesheet" href="/assets/index.css">
    `}
  </head>
  <body>
    <div id="app"></div>
    
    <script type="text/javascript">window.pegasus = %CONTENT%;</script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.min.js"></script>
    
    ${DEBUG ? '<script type="module" src="/src/main.js"></script>' : ''}
  </body>
</html>`;

const ENABLED_ICON = 'enabled.svg';
const DISABLED_ICON = 'disabled.svg';

let disabled = false;

async function init()
{
    const { disabled } = await browser.storage.local.get(['disabled']);
    await setDisabled(disabled);

    browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: [PEGASUS_FILTER] }, ['blocking']);
    browser.browserAction.onClicked.addListener(handleAsync.bind(onBrowserActionClicked));
}

function onBeforeRequest({ url, requestId })
{
    if (disabled) {
        return;
    }

    if (url.startsWith('http:') || url === PEGASUS_URL) {
        return {
            redirectUrl: PEGASUS_PAGE
        };
    }

    if (!url.startsWith(PEGASUS_ROOT)) {
        return {
            redirectUrl: url.replace(PEGASUS_URL, INFINITY_PEGASUS_URL)
        };
    }

    if (url !== PEGASUS_PAGE && url !== PEGASUS_ROOT) {
        return;
    }

    let filter = browser.webRequest.filterResponseData(requestId);
    let decoder = new TextDecoder('utf-8');
    let encoder = new TextEncoder();
    let content = '';

    filter.ondata = event => content += decoder.decode(event.data, { stream: true });
    filter.onstop = () => {
        content = JSON.stringify(content.replace(/<\/script>/g, ''));

        filter.write(encoder.encode(INFINITY_PEGASUS_HTML.replace('%CONTENT%', content)));
        filter.close();
    };
}

async function onBrowserActionClicked(tab)
{
    await setDisabled(!disabled);

    const tabs = await browser.tabs.query({ url: PEGASUS_FILTER });
    for (const { id } of tabs)
    {
        await browser.tabs.reload(id);
    }
}

async function setDisabled(value)
{
    disabled = value;

    await browser.browserAction.setIcon({ path: value ? DISABLED_ICON : ENABLED_ICON });
    await browser.storage.local.set({ disabled });
}

function handleAsync(...args)
{
    this(...args).catch(err => {
        console.error(`Error during call to ${this.name}`);
        console.error(err);
    });
}

handleAsync.bind(init)();
