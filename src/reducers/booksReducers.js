"use strict";

// Setting variable for the initial books state
const booksState = {
  books:
  [
    {
      _id: 1,
      title: 'Book1',
      description: 'Book1 Description',
      price: 19.99
    },
    {
      _id: 2,
      title: 'Book2',
      description: 'Book2 Description',
      price: 29.99
    }
  ]
};

// Creating the Books reducer
export function booksReducers(state = booksState, action) {

  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        books: [...state.books]
      }
    case "POST_BOOK":
      return {
        books: [...state.books, ...action.payload],
      };
    break;

    case "DELETE_BOOK":
      // Make a copy of the current books array
      const currentBookToDelete = [...state.books];
      // Find the index of the book to be deleted
      const indexToDelete = currentBookToDelete.findIndex((book) => {
        return book._id == action.payload;
      });
      return {
        books: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)
        ]
      };
    break;

    case "UPDATE_BOOK":
      // Make a copy of the current books array
      const currentBookToUpdate = [...state.books];
      // Find the index of the current book to be updated
      const indexToUpdate = currentBookToUpdate.findIndex((book) => {
        return book._id === action.payload._id;
      });
      // Store the new book to be updated
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      };
      return {
        books: [
          ...currentBookToUpdate.slice(0, indexToUpdate),
          newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate + 1)
        ],
      };
    break;
  };
  return state;
};
