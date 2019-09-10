import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectCreateDomain = state => state.create || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectCreate = () =>
  createSelector(
    selectCreateDomain,
    substate => substate,
  );

export default makeSelectCreate;
export { selectCreateDomain };