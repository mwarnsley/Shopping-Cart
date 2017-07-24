"use strict";
import axios from 'axios';

// Action to get the cart
export function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then((res) => {
        dispatch({
          type: "GET_CART",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "GET_CART_REJECTED",
          msg: 'error when getting the cart from the session'
        });
      });
  };
}

// Action to add a book to the cart
export function addToCart(cart) {
  return (dispatch) => {
    axios.post('/api/cart', cart)
      .then((res) => {
        dispatch({
          type: "ADD_TO_CART",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "ADD_TO_CART_REJECTED",
          msg: "error when adding to cart"
        });
      });
  };
}

// Action to delete an item from the cart
export function deleteCartItem(cart) {
  return (dispatch) => {
    axios.post('/api/cart', cart)
      .then((res) => {
        dispatch({
          type: "DELETE_CART_ITEM",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "DELETE_CART_ITEM_REJECTED",
          msg: "error when deleting from cart"
        });
      });
  };
}

// Action to update an item in the cart
export function updateCart(_id, unit, cart) {
  // Create a cpy of the current array of books
  const currentBookToUpdate = cart;
  // Determine at which index in the books array is the book to be deleted
  const indexToUpdate = currentBookToUpdate.findIndex((book) => {
    return book._id === _id;
  });
  // Store the new book to update from the cart
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  };
  let cartUpdate = [
    ...currentBookToUpdate.slice(0, indexToUpdate),
    newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)
  ];
  return (dispatch) => {
    axios.post('/api/cart', cartUpdate)
      .then((res) => {
        dispatch({
          type: "UPDATE_CART",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "UPDATE_CART_REJECTED",
          msg: "error when updating the cart"
        });
      });
  };
}
