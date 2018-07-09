import React from 'react';
import {render} from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App';

import registerServiceWorker from './registerServiceWorker';

//redux
import { Provider } from 'react-redux';
import store from './store/index';

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
