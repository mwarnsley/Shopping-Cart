"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {addToCart} from '../../actions/cartActions';

class BookItem extends Component {
  constructor() {
    super();

    this.handleCart = this.handleCart.bind(this);
  }
  handleCart() {
    const {dispatch, cart, _id, title, description, price} = this.props;
    const book = [
      ...cart,
      {_id, title, description, price}
    ];
    dispatch(addToCart(book));
  }
  render() {
    const {title, description, price} = this.props;
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{title}</h6>
            <p>{description}</p>
            <h6>usd. {price}</h6>
            <Button onClick={this.handleCart} bsStyle="primary"></Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

BookItem.propTypes = {
  /**
   * Function to dispatch actions from the store
   */
  dispatch: PropTypes.func.isRequired,
  /**
   * ID number for the item
   */
  _id: PropTypes.number.isRequired,
  /**
   * Title of the book in string format
   */
  title: PropTypes.string.isRequired,
  /**
   * Description of the book in string format
   */
  description: PropTypes.string.isRequired,
  /**
   * Price of the book in number format
   */
  price: PropTypes.number.isRequired,
  /**
   * Array of items that are currently in the cart
   */
  cart: PropTypes.array,
};

export default BookItem;
