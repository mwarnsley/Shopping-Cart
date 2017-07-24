"use strict";

// Creating the Cart Reducer
export function cartReducers(state = {cart:[]}, action) {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    break;
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    break;
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    break;
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
    break;
  };
  return state;
}

// Calculate the totals for the cart
export function totals(payloadArr) {
  const totalAmount = payloadArr.map((cartArr) => {
    return cartArr.price * cartArr.quantity;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  const totalQty = payloadArr.map((qty) => {
    return qty.quantity;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  return {
    amount: totalAmount.toFixed(2),
    qty: totalQty
  };
}
