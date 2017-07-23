"use strict";
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// Import combined reducers
import reducers from './reducers/index';

// Import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

import BooksList from './components/pages/BooksList';
import Menu from './components/Menu';
import Footer from './components/Footer';

// Create the middleware logger for showing logs
const middleware = applyMiddleware(logger);
// Create the store passing in the reducer
const store = createStore(reducers, middleware);

render (
  <Provider store={store}>
    <div>
      <Menu />
      <BooksList />
      <Footer />
    </div>
  </Provider>, document.getElementById('app')
)
