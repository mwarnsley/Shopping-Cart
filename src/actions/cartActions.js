"use strict";

// Action to add a book to the cart
export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  };
}

// Action to delete an item from the cart
export function deleteCartItem(cart) {
  return {
    type: "DELETE_CART_ITEM",
    payload: cart
  }
}

// Action to update an item in the cart
export function updateCart(_id, unit) {
  return {
    type: "UPDATE_CART",
    _id,
    unit
  }
}
