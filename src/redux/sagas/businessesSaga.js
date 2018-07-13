import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBusinesses(action) {
    try{
        const businessesResponse = yield call(axios.post, '/api/businesses', action.payload);
        yield put({type: 'GET_BUSINESSES'});
    }
    catch (error) {
        console.log('error in POST');
    }
}

function* getBusinesses(action) {
    try {
        const businessResponse = yield call(axios.get, '/api/businesses');
        yield put({type: 'UPDATE_BUSINESSES', payload: businessResponse.data})
    } catch (error) {
        console.log('error in GET all');
    }
} // end GET businesses

function* deleteBusinesses(action) {
    try{
        const businessesResponse = yield call(axios.delete, `/api/businesses/${action.payload}`);
        yield put({type: 'GET_BUSINESSES'});
    }
    catch (error) {
        console.log('error in POST');
    }
}

function* businessesSaga() {
    yield takeLatest('ADD_BUSINESSES', addBusinesses);
    yield takeLatest('DELETE_BUSINESSES', deleteBusinesses);
    yield takeLatest('GET_BUSINESSES', getBusinesses);
}

export default businessesSaga;