import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { onChange, value, checked, name } = props;
  return (
    <div>
      <label for={value}>
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
          checked={checked}
          name={name}
          style={{ marginRight: '10px' }}
        />
        {props.children}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  lable: PropTypes.string,
  value: PropTypes.string,
};

export default Checkbox;
