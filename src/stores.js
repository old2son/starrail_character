import { character } from '@src/routes/(authed)/characters/character.js';
import { writable, derived } from 'svelte/store';
export const title = writable('Default Title');
export const characterId = writable(0);
export const characterActive = derived(
    characterId,
	($characterId) => {
        if (!$characterId) {
            return {};
        }

        return character.model.filter((item) => {
            return item.id === $characterId;
        })[0];
    }
);