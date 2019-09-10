/*
 *
 * Chan reducer
 *
 */
import produce from 'immer';
import { SUBMIT_SOUND, SOUND_SUBMITED, CHANGE_TYPE } from './constants';
import { ENUM_CHAN_TYPE } from '../../constants/chanType';

// The initial state of the App
export const initialState = {
	loading: false,
	type: ENUM_CHAN_TYPE.EMITTER
};

/* eslint-disable default-case, no-param-reassign */
const createReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
		case SUBMIT_SOUND:
			draft.loading = true;
			break;
		case SOUND_SUBMITED:
			draft.loading = false;
			break;
		case CHANGE_TYPE:
			draft.type = action.chanType;
			break;
    }
});

export default createReducer;