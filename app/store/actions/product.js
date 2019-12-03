import {createAction} from 'redux-actions';
import {put, takeEvery} from 'redux-saga/effects';
import {groceries} from '../../data/common';
import {
  GET_PRODUCT_START,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  ADD_PRODUCT_START,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../action_types';

export const getProductStart = createAction(GET_PRODUCT_START);
export const getProductRequest = createAction(GET_PRODUCT_REQUEST);
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS);
export const getProductFailure = createAction(GET_PRODUCT_FAILURE);

export const addProductStart = createAction(ADD_PRODUCT_START);
export const addProductRequest = createAction(ADD_PRODUCT_REQUEST);
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS);
export const addProductFailure = createAction(ADD_PRODUCT_FAILURE);

export const deleteProductStart = createAction(DELETE_PRODUCT_START);
export const deleteProductRequest = createAction(DELETE_PRODUCT_REQUEST);
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS);
export const deleteProductFailure = createAction(DELETE_PRODUCT_FAILURE);

//GET REVENUE DATA
function* getProduct(reqData) {
  yield put(getProductRequest());
  yield put(getProductSuccess(groceries));
}

export function* watchGetProduct() {
  yield takeEvery(GET_PRODUCT_START, getProduct)
}

//ADD REVENUE DATA
function* addProduct(reqData) {
  yield put(addProductRequest());
  yield put(addProductSuccess(reqData.payload));
}

export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT_START, addProduct)
}

//DELETE REVENUE DATA
function* deleteProduct(reqData) {
  yield put(deleteProductRequest());
  yield put(deleteProductSuccess(reqData.payload));
}

export function* watchDeleteProduct() {
  yield takeEvery(DELETE_PRODUCT_START, deleteProduct)
}
