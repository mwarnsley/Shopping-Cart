"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';

class Cart extends Component {
  renderEmpty() {
    return (<div/>);
  }
  renderCart() {
    const {cart} = this.props;
    const cartItemList = cart.map((item) => {
      return (
        <Panel key={item._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{item.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {item.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success"></Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button bsStyle="default" bsSize="small">-</Button>
                <Button bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button bsStyle="danger" bsSize="small">DELETE</Button>
              </ButtonGroup>
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
