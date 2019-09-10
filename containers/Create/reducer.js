/*
 *
 * Create reducer
 *
 */
import produce from 'immer';
import { CREATE_CHAN } from './constants';

// The initial state of the App
export const initialState = {
	loading: false
};

/* eslint-disable default-case, no-param-reassign */
const createReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
		case CREATE_CHAN:
			draft.loading = true;
			break;
    }
});

export default createReducer;