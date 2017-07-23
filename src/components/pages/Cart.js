"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button} from 'react-bootstrap';

class Cart extends Component {
  renderEmpty() {
    return (<div/>);
  }
  renderCart() {
    const {cart} = this.props;
    const cartItemList = cart.map((item) => {
      return (
        <Panel key={item.id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{item.title}</h6>
            </Col>
          </Row>
        </Panel>
      );
    });
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemList}
      </Panel>
    );
  }
  render() {
    const {cart} = this.props;
    if (cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps)(Cart);
