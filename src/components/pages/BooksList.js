"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

import BookItem from './BookItem';
import BooksForm from './BooksForm';

class BooksList extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getBooks());
  }
  render() {
    const {books, dispatch} = this.props;
    const booksList = books.map((book) => {
      return (
        <Col xs={12} sm={6} md={4} key={book.id}>
          <BookItem
            id={book.id}
            title={book.title}
            description={book.description}
            price={book.price}/>
        </Col>
      );
    });
    return (
      <Grid>
        <Row style={{marginTop: '15px'}}>
          <Col xs={12} sm={6}>
            <BooksForm dispatch={dispatch}/>
          </Col>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

BooksForm.propTypes = {
  /**
   * Function to dispatch actions from the store
   */
  dispatch: PropTypes.func.isRequired,
  /**
   * Array of books coming from redux in the form of an array of objects
   */
  books: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

export default connect(mapStateToProps)(BooksList);
