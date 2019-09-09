/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { CHANGE_INPUT_CHAN, SUBMIT_CHAN } from './constants';
import { _ } from 'lodash';

// The initial state of the App
export const initialState = {
	chan: '',
	chans: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
		case CHANGE_INPUT_CHAN:
			draft.chan = action.text;
			break;
		case SUBMIT_CHAN:
			draft.chans = _.union([action.chan], draft.chans);
			break;
    }
});

export default homeReducer;