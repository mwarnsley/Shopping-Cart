"use strict";

// Add book to cart action
export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  };
}

// Delete from cart
export function deleteCartItem(cart) {
  return {
    type: "DELETE_CART_ITEM",
    payload: cart
  }
}

// Update the cart
export function updateCart(_id, unit) {
  return {
    type: "UPDATE_CART",
    _id,
    unit
  }
}
