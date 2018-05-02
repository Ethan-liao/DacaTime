import React from 'react';
import PropTypes from 'prop-types';

const Panel = props =>
  <div className={`dt-panel ${props.className || ''}`}>
    {props.children}
  </div>;

Panel.propTypes = {
  className: PropTypes.string,
};

export default Panel;
