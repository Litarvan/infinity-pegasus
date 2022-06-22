import { writable } from 'svelte/store';

export const justLoggedOut = writable(hasJustLoggedOut());
export const progress = writable('loading');
export const modal = writable(null);

function hasJustLoggedOut()
{
    if (localStorage.loggedOut) {
        localStorage.removeItem('loggedOut');
        return true;
    }

    return false;
}
