import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { allReducers } from './reducers/index';
import ErrorBoundary from './components/ErrorBoundary';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import 'toastr/toastr.scss';
import ES6Promise from 'es6-promise';
import assignPolyfill from './utils/polyfill';

assignPolyfill();
ES6Promise.polyfill();

const middleware = applyMiddleware(thunk, logger);
const store = createStore(allReducers, {}, middleware);

/** bootstrap app component */

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
