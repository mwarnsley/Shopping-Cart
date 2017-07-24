"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends Component {
  constructor() {
    super();

    this.handleCart = this.handleCart.bind(this);
  }
  handleCart() {
    const {
      dispatch,
      cart,
      _id,
      title,
      description,
      price} = this.props;
    const book = [
      ...cart,
      {_id, title, description, price, quantity: 1}
    ];
    // Check if the cart is empty
    if (cart.length > 0) {
      let _id = _id;
      let cartIndex = cart.findIndex((item) => {
        return item._id === _id;
      });
      // If cartIndex returns -1 there are no items with the same ID
      if (cartIndex === -1) {
        dispatch(addToCart(book));
      } else {
        dispatch(updateCart(_id, 1));
      }
      return;
    }
    dispatch(addToCart(book));
  }
  render() {
    const {
      title,
      description,
      price} = this.props;
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{title}</h6>
            <p>{description}</p>
            <h6>usd. {price}</h6>
            <Button onClick={this.handleCart} bsStyle="primary">Buy now</Button>
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
  _id: PropTypes.string.isRequired,
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
