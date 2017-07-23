"use strict";
import React, {Component} from 'react';
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

export default BookItem;
