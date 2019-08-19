/*
 *
 * Home reducer
 *
 */
import produce from 'immer';

// The initial state of the App
export const initialState = {
  list: [],
  rates : [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
	  default: break;
    }
  });

export default homeReducer;