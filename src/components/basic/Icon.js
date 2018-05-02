import React from 'react';
import PropTypes from 'prop-types';

const Icon = props =>
  <i className={`fa ${props.name} ${props.className || ''}`} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
