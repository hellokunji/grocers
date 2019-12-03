import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {AUTH_USER} from './action_types';
import reducer from './combined_reducers';
import rootSaga from './root_saga';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const NODE_ENV = 'DEVELOPMENT';
let store;
if (NODE_ENV === 'DEVELOPMENT') {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
  store = createStoreWithMiddleware(
    reducer,
    composeEnhancer()
  );
}
else {
  store = createStoreWithMiddleware(
    reducer
  );
}

const profile = window.localStorage.getItem('profile');
if (profile) {
  store.dispatch({
    type: AUTH_USER,
    payload: {
      profile: JSON.parse(profile),
    }
  });
}

sagaMiddleware.run(rootSaga);

export default store;
