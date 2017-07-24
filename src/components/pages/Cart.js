"use strict";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getCart());
  }
  open() {
    this.setState({
      showModal: true,
    });
  }
  close() {
    this.setState({
      showModal: false,
    });
  }
  onDelete(_id) {
    const {dispatch, cart} = this.props;
    // Filter the current state of the cart to remove the selected item
    const cartAfterDelete = cart.filter((item) => {
      return item._id !== _id;
    });
    dispatch(deleteCartItem(cartAfterDelete));
  }
  onIncrement(_id) {
    const {dispatch, cart} = this.props;
    dispatch(updateCart(_id, 1, cart));
  }
  onDecrement(_id, quantity) {
    const {dispatch, cart} = this.props;
    // Check if the quanity is greater than 1 so we don't go into negative numbers
    if (quantity > 1) {
      dispatch(updateCart(_id, -1, cart));
    }
  }
  renderEmpty() {
    return (<div/>);
  }
  renderCart() {
    const {cart, totalAmount} = this.props;
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
              <h6>qty. <Label bsStyle="success">{item.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button
                  onClick={() => this.onDecrement(item._id, item.quantity)}
                  bsStyle="default"
                  bsSize="small">
                  -
                </Button>
                <Button
                  onClick={() => this.onIncrement(item._id)}
                  bsStyle="default"
                  bsSize="small">
                  +
                </Button>
                <span>     </span>
                <Button
                  onClick={() => this.onDelete(item._id)}
                  bsStyle="danger"
                  bsSize="small">
                  DELETE
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    });
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount: {totalAmount}</h6>
            <Button onClick={this.open} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {totalAmount}</h6>
            </Col>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
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
  dispatch: PropTypes.func,
  /**
   * Array of items that are currently in the cart
   */
  cart: PropTypes.array,
  /**
   * Total Amount inside of the cart
   */
  totalAmount: PropTypes.string,
};

export default connect(state => ({
  cart: state.cart.cart,
  totalAmount: state.cart.totalAmount
}))(Cart);
