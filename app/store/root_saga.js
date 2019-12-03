import {all} from 'redux-saga/effects';
import {
  watchFacebookSignIn,
  watchLogout,
} from './actions/auth';
import {
  watchGetProduct,
  watchAddProduct,
  watchDeleteProduct,
} from './actions/product';

export default function* rootSaga() {
  yield all([
    watchFacebookSignIn(),
    watchGetProduct(),
    watchAddProduct(),
    watchDeleteProduct(),
    watchLogout(),
  ])
}
