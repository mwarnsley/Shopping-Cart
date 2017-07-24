"use strict";
import axios from 'axios';

// Action to get books on component mounting
export function getBooks() {
  return {
    type: "GET_BOOKS"
  }
}

// Action to post a new book
export function postBooks(book) {
  return (dispatch) => {
    axios.post("/books", book)
      .then((res) => {
        dispatch({
          type: "POST_BOOK",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "POST_BOOK_REJECTED",
          payload: "There was an error while trying to post this book"
        });
      });
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
