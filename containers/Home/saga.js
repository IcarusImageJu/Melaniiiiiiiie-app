import { takeLatest, call, put, select } from 'redux-saga/effects';
import { client } from '../../utils/apollo';

import { SUBMIT_CHAN } from './constants';


function* checkChanExist({chan, push}) {  
    try {		  
		push(`/create/${chan}`)
    } catch (err) {
      	console.log(err);
    }
}


// Individual exports for testing
export default function* homeSaga() {
    yield takeLatest(SUBMIT_CHAN, checkChanExist);
}
