import {createAction} from 'redux-actions';
import {put, takeEvery, call} from 'redux-saga/effects';
import {getMethod, postMethod} from '../../utils/api';
import {apiConfig} from '../../config/config';
import {formatErrorMsg} from '../../utils/helpers';
import {
  GET_PRODUCT_START,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_ACTIVE_PRODUCT_START,
  GET_ACTIVE_PRODUCT_REQUEST,
  GET_ACTIVE_PRODUCT_SUCCESS,
  GET_ACTIVE_PRODUCT_FAILURE,
  ADD_PRODUCT_START,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../action_types';
import {toastUpdate} from './layout';

export const getProductStart = createAction(GET_PRODUCT_START);
export const getProductRequest = createAction(GET_PRODUCT_REQUEST);
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS);
export const getProductFailure = createAction(GET_PRODUCT_FAILURE);

export const getActiveProductStart = createAction(GET_ACTIVE_PRODUCT_START);
export const getActiveProductRequest = createAction(GET_ACTIVE_PRODUCT_REQUEST);
export const getActiveProductSuccess = createAction(GET_ACTIVE_PRODUCT_SUCCESS);
export const getActiveProductFailure = createAction(GET_ACTIVE_PRODUCT_FAILURE);

export const addProductStart = createAction(ADD_PRODUCT_START);
export const addProductRequest = createAction(ADD_PRODUCT_REQUEST);
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS);
export const addProductFailure = createAction(ADD_PRODUCT_FAILURE);

export const updateProductStart = createAction(UPDATE_PRODUCT_START);
export const updateProductRequest = createAction(UPDATE_PRODUCT_REQUEST);
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS);
export const updateProductFailure = createAction(UPDATE_PRODUCT_FAILURE);

export const deleteProductStart = createAction(DELETE_PRODUCT_START);
export const deleteProductRequest = createAction(DELETE_PRODUCT_REQUEST);
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS);
export const deleteProductFailure = createAction(DELETE_PRODUCT_FAILURE);

//GET PRODUCT
function* getProduct() {
  yield put(getProductRequest());
  try {
    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/product/all`);
    if (response) {
      yield put(getProductSuccess(response.data));
    }
    if (error) {
      yield put(getProductFailure(error));
      yield put(toastUpdate(formatErrorMsg('error', 'Error', '')));
    }
  } catch (error) {
    yield put(getProductFailure(error));
    yield put(toastUpdate(formatErrorMsg('error', 'Error', '')));
  }
}

export function* watchGetProduct() {
  yield takeEvery(GET_PRODUCT_START, getProduct)
}

//GET ACTIVE PRODUCT
function* getActiveProduct() {
  yield put(getActiveProductRequest());
  try {
    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/product/active`);
    if (response) {
      yield put(getActiveProductSuccess(response.data));
    }
    if (error) {
      yield put(getActiveProductFailure(error));
      yield put(toastUpdate(formatErrorMsg('error', 'Error', '')));
    }
  } catch (error) {
    yield put(getActiveProductFailure(error));
    yield put(toastUpdate(formatErrorMsg('error', 'Error', '')));
  }
}

export function* watchGetActiveProduct() {
  yield takeEvery(GET_ACTIVE_PRODUCT_START, getActiveProduct)
}

//ADD PRODUCT
function* addProduct(reqData) {
  yield put(addProductRequest());
  try {
    const {response, error} = yield call(postMethod, `${apiConfig('v1')}/product/active`, reqData.payload);
    if (response) {
      yield put(addProductSuccess(response.data));
    }
    if (error) {
      yield put(addProductFailure(error));
      yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't add product`)));
    }
  } catch (error) {
    yield put(addProductFailure(error));
    yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't add product`)));
  }
}

export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT_START, addProduct)
}

//UPDATE PRODUCT
function* updateProduct(reqData) {
  yield put(updateProductRequest());
  try {
    const {response, error} = yield call(postMethod, `${apiConfig('v1')}/product/active/update`, reqData.payload);
    if (response) {
      yield put(updateProductSuccess(response.data));
    }
    if (error) {
      yield put(updateProductFailure(error));
      yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't update product`)));
    }
  } catch (error) {
    yield put(updateProductFailure(error));
    yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't update product`)));
  }
}

export function* watchUpdateProduct() {
  yield takeEvery(UPDATE_PRODUCT_START, updateProduct)
}

//DELETE PRODUCT
function* deleteProduct(reqData) {
  yield put(deleteProductRequest());
  yield put(deleteProductSuccess(reqData.payload));
  yield put(deleteProductRequest());
  try {
    const {response, error} = yield call(postMethod, `${apiConfig('v1')}/product/active/delete`, reqData.payload);
    if (response) {
      yield put(deleteProductSuccess(response.data));
    }
    if (error) {
      yield put(deleteProductFailure(error));
      yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't delete product`)));
    }
  } catch (error) {
    yield put(deleteProductFailure(error));
    yield put(toastUpdate(formatErrorMsg('error', 'Error', `Couldn't delete product`)));
  }
}

export function* watchDeleteProduct() {
  yield takeEvery(DELETE_PRODUCT_START, deleteProduct)
}
