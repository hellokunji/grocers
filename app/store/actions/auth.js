import {createAction} from 'redux-actions';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  FACEBOOK_LOGIN_START,
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH,
  RESET_PRODUCT,
} from '../action_types';

export const facebookLoginStart = createAction(FACEBOOK_LOGIN_START);
export const facebookLoginRequest = createAction(FACEBOOK_LOGIN_REQUEST);
export const facebookLoginSuccess = createAction(FACEBOOK_LOGIN_SUCCESS);
export const facebookLoginFailure = createAction(FACEBOOK_LOGIN_FAILURE);

export const logoutStart = createAction(LOGOUT);
export const resetAuth = createAction(RESET_AUTH);
export const resetProduct = createAction(RESET_PRODUCT);

import {toastUpdate} from './layout';

//SOCIAL LOGIN - FACEBOOK
function* facebookSignIn(reqData) {
  yield put(facebookLoginRequest());
  console.log('reqData', reqData);
  if (reqData.payload.success) {
    window.localStorage.setItem('profile', JSON.stringify(reqData.payload.profile));
    window.localStorage.setItem('credential', JSON.stringify(reqData.payload.credential));
    yield put(facebookLoginSuccess({
      profile: reqData.payload.profile,
      credential: reqData.payload.credential,
    }));
  } else {
    toastUpdate({
      show: true,
      type: 'error',
      content: {
        title: 'Sign-in Error',
        description: ''
      },
    });
    yield put(facebookLoginFailure({
      error: reqData.payload.error,
    }));
  }
}

export function* watchFacebookSignIn() {
  yield takeEvery(FACEBOOK_LOGIN_START, facebookSignIn)
}

//LOGOUT
function* logout() {
  window.localStorage.removeItem('profile');  //WEB SPECIFIC CODE
  window.localStorage.removeItem('profile');  //WEB SPECIFIC CODE
  yield put(resetAuth());
  yield put(resetProduct());
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout)
}
