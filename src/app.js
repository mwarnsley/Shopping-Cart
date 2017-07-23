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

import BooksList from './components/pages/bookslist';

// Create the middleware logger for showing logs
const middleware = applyMiddleware(logger);
// Create the store passing in the reducer
const store = createStore(reducers, middleware);

// -->> Dispatch Book Actions <<--
// store.dispatch(postBooks(
//   [
//     {
//       id: 1,
//       title: 'Book1',
//       description: 'Book1 Description',
//       price: 19.99
//     },
//     {
//       id: 2,
//       title: 'Book2',
//       description: 'Book2 Description',
//       price: 29.99
//     }
//   ]
// ));

// store.dispatch(deleteBooks(
//   {id: 1}
// ));
// store.dispatch(updateBooks(
//   {
//     id: 2,
//     title: 'Learn React in 24h'
//   }
// ));
//
// // -->> Dispatch Cart Actions <<--
// store.dispatch(addToCart([{id: 1}]));

render (
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
)
