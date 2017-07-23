"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well, Button} from 'react-bootstrap';

class BookItem extends Component {
  render() {
    const {title, description, price} = this.props;
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{title}</h6>
            <p>{description}</p>
            <h6>usd. {price}</h6>
            <Button bsStyle="primary"></Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

BookItem.propTypes = {
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
};

export default BookItem;
