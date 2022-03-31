import { writable } from 'svelte/store';

export const justLoggedOut = writable(hasJustLoggedOut());
export const progress = writable("Chargement");

function hasJustLoggedOut()
{
    if (localStorage.loggedOut) {
        localStorage.removeItem('loggedOut');
        return true;
    }

    return false;
}
