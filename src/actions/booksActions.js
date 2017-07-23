"use strict";

// Action to get books on component mounting
export function getBooks() {
  return {
    type: "GET_BOOKS"
  }
}

// Action to post a new book
export function postBooks(book) {
  return {
    type: "POST_BOOK",
    payload: book
  };
}

// Action to delete a book
export function deleteBooks(id) {
  return {
    type: "DELETE_BOOK",
    payload: id
  };
}

// Action to update a book
export function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  };
}
