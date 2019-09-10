import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectChanDomain = state => state.chan || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectChan = () =>
  createSelector(
    selectChanDomain,
    substate => substate,
  );

export default makeSelectChan;
export { selectChanDomain };