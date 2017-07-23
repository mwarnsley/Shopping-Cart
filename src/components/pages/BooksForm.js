"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/booksActions';

class BooksForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  handleSubmit() {
    const {dispatch} = this.props;
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        price: findDOMNode(this.refs.price).value
      }
    ];
    dispatch(postBooks(book));
  }
  onDelete() {
    const {dispatch} = this.props;
    let bookId = findDOMNode(this.refs.delete).value;
    dispatch(deleteBooks(bookId));
  }
  render() {
    const {dispatch, books} = this.props;
    const booksList = books.map((book) => {
      return (
        <option key={book._id}>
          {book._id}
        </option>
      );
    });
    return(
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description" />
          </FormGroup>
          <FormGroup controlId="title">
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Price"
              ref="price" />
          </FormGroup>
          <Button onClick={this.handleSubmit} bsStyle="primary">Save Book</Button>
        </Panel>
        <Panel style={{marginTop: '25px'}}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book id to delete</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">Select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete} bsStyle="danger">Delete Book</Button>
        </Panel>
      </Well>
    );
  }
}

BooksForm.propTypes = {
  /**
   * Function to dispatch actions from the store
   */
  dispatch: PropTypes.func,
  /**
   * Array of books coming from redux in the form of an array of objects
   */
  books: PropTypes.array,
};

export default connect(state => ({
  books: state.books.books
}))(BooksForm);
