import { init, addMessages, getLocaleFromNavigator } from 'svelte-i18n';

import en from './lib/i18n/en';
import fr from './lib/i18n/fr';

addMessages('en', en);
addMessages('fr', fr);

init({
    fallbackLocale: 'en',
    initialLocale: /*getLocaleFromNavigator()*/ 'en'
});

import App from './App.svelte';

const app = new App({
    target: document.getElementById('app')
});

export default app;
