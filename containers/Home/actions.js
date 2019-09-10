import slug from 'slug';

import { CHANGE_INPUT_CHAN, SUBMIT_CHAN } from './constants';

export function changeInputChan(val) {
	const text = slug(val.replace(/\s+/g, '-'));
    return{
		text,
        type: CHANGE_INPUT_CHAN,
    }
}

export function submitChan(chan, push) {
    return{
		push,
		chan,
        type: SUBMIT_CHAN,
    }
}

