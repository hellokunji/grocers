import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store/store';
import App from './app';
import './index.scss';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main_app')
);