import {combineReducers} from 'redux';
import authReducer from './reducers/auth';
import layoutReducer from './reducers/layout';
import productReducer from './reducers/product';

const reducer = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
  product: productReducer,
});

export default reducer;
