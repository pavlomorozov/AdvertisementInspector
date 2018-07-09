import React from 'react';
import {render} from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App';

import registerServiceWorker from './registerServiceWorker';

//redux
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import store from './store/index';

console.log(store);

//import thunk from 'redux-thunk';
//import * as reducers from './store/reducers';
//const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
//const store = 'hello';
//const store = createStore(reducer), initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
