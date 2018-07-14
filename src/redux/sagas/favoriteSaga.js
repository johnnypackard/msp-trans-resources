import { put, takeEvery, call } from 'redux-saga/effects';
import { FAVORITE_ACTIONS } from '../actions/favoriteActions';
import { getFavorite, addFavoriteToDatabase, deleteFavoriteFromDatabase, updateFavorite} from '../requests/favoriteRequests';
import { USER_ACTIONS } from '../actions/userActions';

function* fetchFavorite() {
    try {
        const favorite = yield getFavorite()
        yield put({
            type: FAVORITE_ACTIONS.set,
            payload: favorite
        });
    } catch (error) {
        console.log(error);
    };
}

function* postFavorite(action) {
    try {
        yield put({
            type: USER_ACTIONS.ADD_FAVORITE,
            payload: action.payload
        });
        yield addFavoriteToDatabase(action);
        const user = yield getFavorite();
        console.log('GET update favorite for:', user);
        yield put({
            type: USER_ACTIONS.SET_FAVORITES,
            user
        });
    } catch (error) {
        console.log(error);
    }
}

function* deleteFavorite(action) {
    console.log('DELETE favorite saga', action);
    try {
        yield deleteFavoriteFromDatabase(action.payload);
        const user = yield getFavorite();
        console.log('DELETE favorite for:', user);
        yield put ({
            type: USER_ACTIONS.SET_FAVORITE,
            user
        });
    } catch (error) {
        console.log(error);
    }
}

function* updateFavorite(action) {
    console.log('UPDATE FAVORITE', action.payload);
    try {
        yield updateFavoriteComment(action.payload);
        const user = yield getFavorite();
        yield put ({
            type: USER_ACTIONS.SET_FAVORITE,
            user
        }) 
    } catch (error) {
        console.log(error);
    }
}

function* favoriteSaga() {
    console.log('favoriteSaga');
    yield takeEvery(FAVORITE_ACTIONS.GET, fetchFavorite);
    yield takeEvery(FAVORITE_ACTIONS.ADD, postFavorite);
    yield takeEvery(FAVORITE_ACTIONS.DELETE, deleteFavorite);
    yield takeEvery(FAVORITE_ACTIONS.SET, updateFavorite);
}

export default favoriteSaga;