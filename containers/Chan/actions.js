import { SUBMIT_SOUND, SOUND_SUBMITED, CHANGE_TYPE } from './constants';

export function createChan() {
	return{
		type: SUBMIT_SOUND,
	}
}

export function soundSubmited() {
	return{
		type: SOUND_SUBMITED,
	}
}

export function changeType(chanType) {
	return{
		chanType,
		type: CHANGE_TYPE,
	}
}