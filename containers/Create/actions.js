import { CREATE_CHAN } from './constants';

export function createChan(chan, push, sound){
	return{
		chan,
		push,
		sound,
		type: CREATE_CHAN,
	}
}