import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { client } from '../../utils/apollo';
import { loadedList, loadedCurrencies } from './actions'

import { LOAD_LIST, LOAD_CURRENCIES } from "./constants";
import { getCurrencyName } from './queries';

function* getRepos() {
    const requestURL = `https://api.github.com/users/IcarusImageJu/repos?type=all&sort=updated`;
  
    try {
      // Call our request helper (see 'utils/request')
      const repos = yield call(request, requestURL);
      yield put(loadedList(repos));
    } catch (err) {
      console.log(err);
    }
  }

function* getCurrencies(){
  try {
    const { data } = yield call(client.query, getCurrencyName);
    yield put(loadedCurrencies(data.rates));
  } catch (error) {
    console.log(error)
  }
}

// Individual exports for testing
export default function* homeSaga() {
    // See example in containers/HomePage/saga.js
    yield takeLatest(LOAD_LIST, getRepos);
    yield takeLatest(LOAD_CURRENCIES, getCurrencies);
  }
  