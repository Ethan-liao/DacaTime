import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = props =>
  <div onChange={props.onChange}>
    {props.children}
  </div>;

FormGroup.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default FormGroup;
