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

const isMobileFn = () => {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true;
    } else {
        return false;
    }
};
export const isMobile = writable(isMobileFn());