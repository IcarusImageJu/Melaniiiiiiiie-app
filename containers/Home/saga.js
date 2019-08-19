import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { client } from '../../utils/apollo';

import { getCurrencyName } from './queries';

function* getRepos() {
 
    try {
      // Call our request helper (see 'utils/request')
    } catch (err) {
      console.log(err);
    }
}


// Individual exports for testing
export default function* homeSaga() {
    // See example in containers/HomePage/saga.js

  }
  