import React from 'react';
import logo from '../logo.png';
import PropTypes from 'prop-types';

const Header = props =>
  <div className="dt-header-bar">
    <img alt="DACA Time logo" src={logo} className="header-logo" />
    {props.children}
  </div>;

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
