"use strict";
import React, {Component} from 'react';
import Menu from './components/Menu';
import Footer from './components/Footer';

class Main extends Component {
  render() {
    return (
      <div>
        <Menu />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Main;
