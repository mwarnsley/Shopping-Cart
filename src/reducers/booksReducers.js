"use strict";

// Creating the Books reducer
export function booksReducers(state = {
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
}, action) {

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
      const currentBookToDelete = [...state.books];
      const indexToDelete = currentBookToDelete.findIndex((book) => {
        return book._id === action.payload._id;
      });
      return {
        books: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)
        ]
      };
    break;

    case "UPDATE_BOOK":
      const currentBookToUpdate = [...state.books]
      const indexToUpdate = currentBookToUpdate.findIndex((book) => {
        return book._id === action.payload._id;
      });
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      };
      console.log('What is it newBookToUpdate', newBookToUpdate);
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
