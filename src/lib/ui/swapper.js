import { writable } from 'svelte/store';

export default function () {
    const state = writable('A');

    let next = 'A';
    let swapping = false;

    function toggle() {
        if (swapping) {
            return;
        }

        swapping = true;
        next = next === 'A' ? 'B' : null;

        state.set(null);
    }

    function outro() {
        swapping = false;
        state.set(next);
    }

    return {
        state,
        toggle,
        outro
    }
}