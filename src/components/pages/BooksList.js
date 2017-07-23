"use strict";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

class BooksList extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getBooks());
  }
  render() {
    const {books, dispatch} = this.props;
    const booksList = books.map((book) => {
      return (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <h2>{book.description}</h2>
          <h2>{book.price}</h2>
          <Button bsStyle="primary"></Button>
        </div>
      );
    });
    return (
      <Grid>
        <Row style={{marginTop: '15px'}}>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

export default connect(mapStateToProps)(BooksList);
