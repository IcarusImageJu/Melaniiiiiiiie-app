import { takeLatest, call, put, select } from 'redux-saga/effects';
import { client } from '../../utils/apollo';

import { CREATE_CHAN } from './constants';


function* createChan({chan, push}) {  
    try {
		push(`/chan/${chan}`)
    } catch (err) {
      	console.log(err);
    }
}


// Individual exports for testing
export default function* createSaga() {
    yield takeLatest(CREATE_CHAN, createChan);
}
