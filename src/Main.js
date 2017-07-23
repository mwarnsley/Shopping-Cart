"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Menu from './components/Menu';
import Footer from './components/Footer';

class Main extends Component {
  render() {
    const {totalQty} = this.props;
    return (
      <div>
        <Menu cartItemNumber={totalQty}/>
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  totalQty: state.cart.totalQty
}))(Main);
