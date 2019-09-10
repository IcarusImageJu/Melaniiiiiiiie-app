import { takeLatest, call, put, select } from 'redux-saga/effects';
import { client } from '../../utils/apollo';

import { soundSubmited } from './actions';
import { SUBMIT_SOUND } from './constants';


function* loadAndPlaySound() {  
    try {
		console.log('pouet');
		yield put(soundSubmited())
    } catch (err) {
      	console.log(err);
    }
}


// Individual exports for testing
export default function* chanSaga() {
    yield takeLatest(SUBMIT_SOUND, loadAndPlaySound);
}
