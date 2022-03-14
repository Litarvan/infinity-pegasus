// TODO: We could maybe merge this with firefox background.js
// TODO: In 2023, manifests v2 will be deprecated, thus enforcing scripts to be statically included.

const PEGASUS_FILTER = '*://inge-etud.epita.net/*';

const ENABLED_ICON = {
    48: 'enabled_48.png',
    128: 'enabled_128.png'
};
const DISABLED_ICON = {
    48: 'disabled_48.png',
    128: 'disabled_128.png'
};

async function init()
{
    const { disabled } = await browser.storage.local.get(['disabled']);
    await setDisabled(disabled);

    browser.browserAction.onClicked.addListener(handleAsync.bind(onBrowserActionClicked));
}

async function onBrowserActionClicked(tab)
{
    const { disabled } = await browser.storage.local.get(['disabled']);
    await setDisabled(!disabled);

    const tabs = await browser.tabs.query({ url: PEGASUS_FILTER });
    for (const t of tabs)
    {
        await browser.tabs.reload(t.id);
    }
}

async function setDisabled(disabled)
{
    await browser.storage.local.set({ disabled });
    await browser.browserAction.setIcon({ path: disabled ? DISABLED_ICON : ENABLED_ICON });
}

function handleAsync(...args)
{
    this(...args).catch(err => {
        console.error(`Error during call to ${this.name}`);
        console.error(err);
    });
}

handleAsync.bind(init)();
