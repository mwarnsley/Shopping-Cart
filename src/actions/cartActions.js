"use strict";

// Add book to cart action
export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  };
}
