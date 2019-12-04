import {all} from 'redux-saga/effects';
import {
  watchFacebookSignIn,
  watchLogout,
} from './actions/auth';
import {
  watchGetProduct,
  watchGetActiveProduct,
  watchAddProduct,
  watchUpdateProduct,
  watchDeleteProduct,
} from './actions/product';

export default function* rootSaga() {
  yield all([
    watchFacebookSignIn(),
    watchGetProduct(),
    watchGetActiveProduct(),
    watchAddProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
    watchLogout(),
  ])
}
