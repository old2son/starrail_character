import sum from './sum.js';
import { expect, test, describe, it } from 'vitest';

describe('#sum', () => {
	it('returns 0 with no numbers', () => {
		expect(sum()).toBe(0);
	});
});
