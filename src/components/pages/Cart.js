"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem} from '../../actions/cartActions';

class Cart extends Component {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(_id) {
    const {dispatch, cart} = this.props;
    const cartAfterDelete = cart.filter((item) => {
      return item._id !== _id;
    });
    dispatch(deleteCartItem(cartAfterDelete));
  }
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
                <Button onClick={() => this.onDelete(item._id)} bsStyle="danger" bsSize="small">DELETE</Button>
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

Cart.propTypes = {
  /**
   * Function to dispatch actions from the store
   */
  dispatch: PropTypes.func.isRequired,
  /**
   * Array of items that are currently in the cart
   */
  cart: PropTypes.array,
};

export default Cart;
