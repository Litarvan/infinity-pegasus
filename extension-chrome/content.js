// This method actually sucks, original page is first loaded and displayed before being replaced by ours.
// Since Chrome never implemented webRequest.filterResponseData (that we use on firefox), there is sadly no better way (as far as I know).

const DEBUG = false;

const INFINITY_PEGASUS_URL = DEBUG ? 'http://localhost:5000/' : 'https://api.pegasus.infinity.study/';

async function init()
{
    const { disabled } = await chrome.storage.local.get(['disabled']);
    if (disabled) {
        return;
    }

    const pegasus = document.documentElement.innerHTML.replaceAll('&amp;', '&');
    document.documentElement.innerHTML = await fetch(INFINITY_PEGASUS_URL).then(r => r.text());

    const element = document.createElement('div');
    element.id = 'pegasus-original-content';
    element.style.display = 'none';
    element.innerText = pegasus;
    document.body.appendChild(element);

    try {
        await chrome.runtime.sendMessage(document.querySelector('script[crossorigin]').src);
    } catch (e) {
        // I don't know why it crashes, but it still works
    }
}

init().catch(err => {
    console.error('Error during Infinity Pegasus injection!');
    console.error(err);
})
