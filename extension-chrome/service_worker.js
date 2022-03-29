// TODO: We could maybe merge this with firefox background.js

const PEGASUS_FILTER = '*://inge-etud.epita.net/*';

const ENABLED_ICON = {
    48: 'enabled_48.png',
    128: 'enabled_128.png'
};
const DISABLED_ICON = {
    48: 'disabled_48.png',
    128: 'disabled_128.png'
};

function init()
{
    // Since Manifest V3, listeners MUST be registered synchronously
    chrome.action.onClicked.addListener(handleAsync.bind(onBrowserActionClicked));
    chrome.runtime.onMessage.addListener(handleAsync.bind(onMessage));

    handleAsync.bind(load)();
}

async function load()
{
    const { disabled } = await chrome.storage.local.get(['disabled']);
    await setDisabled(disabled);
}

async function onBrowserActionClicked(tab)
{
    const { disabled } = await chrome.storage.local.get(['disabled']);
    await setDisabled(!disabled);

    const tabs = await chrome.tabs.query({ url: PEGASUS_FILTER });
    for (const t of tabs) {
        await chrome.tabs.reload(t.id);
    }
}

async function onMessage(url, { tab: { id: tabId }})
{
    await chrome.scripting.executeScript({
        target: { tabId },
        files: ['pdf.min.js'],
        world: 'MAIN'
    });

    await chrome.scripting.executeScript({
        target: { tabId },
        func: addScript,
        args: [url],
        world: 'MAIN'
    });
}

function addScript(url)
{
    const element = document.createElement('script');
    element.type = 'text/javascript';
    element.crossorigin = 'anonymous';
    element.type = 'module';
    element.src = url;

    document.body.appendChild(element);
}

async function setDisabled(disabled)
{
    await chrome.storage.local.set({ disabled });
    await chrome.action.setIcon({ path: disabled ? DISABLED_ICON : ENABLED_ICON });
}

function handleAsync(...args)
{
    this(...args).catch(err => {
        console.error(`Error during call to ${this.name}`);
        console.error(err);
    });
}

init();
