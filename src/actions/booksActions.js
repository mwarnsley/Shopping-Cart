"use strict";
import axios from 'axios';

// Action to get books on component mounting
export function getBooks() {
  return (dispatch) => {
    axios.get('/api/books')
      .then((res) => {
        dispatch({
          type: "GET_BOOKS",
          payload: res.data
        });
      }).catch((err) => {
        dispatch({
          type: "GET_BOOKS_REJECTED",
          payload: err
        });
      });
  };
}

// Action to post a new book
export function postBooks(book) {
  return (dispatch) => {
    axios.post("/api/books", book)
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
  return (dispatch) => {
    axios.delete(`/api/books/${id}`)
      .then((res) => {
        dispatch({
          type: "DELETE_BOOK",
          payload: id
        });
      }).catch((err) => {
        dispatch({
          type: "DELETE_BOOK_REJECTED",
          payload: err
        });
      });
  };
}

// Action to update a book
export function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  };
}
