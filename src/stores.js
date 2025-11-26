import { character } from '@src/routes/(authed)/characters/character.js';
import { writable, derived } from 'svelte/store';
export const title = writable('标题');
export const desc = writable('描述');
export const headerHover = writable(false);
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