import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = props => {
  return (
    <div className="dt-radio-container">
      <input
        className="dt-radio-input"
        type="radio"
        key={props.name}
        checked={props.name === props.value}
        value={props.name}
        name={`radio-${props.questionId}-${props.name}`}
        id={`radio-${props.questionId}-${props.name}`}
        hidden={true}
        onChange={() => {}}
      />
      <label
        className="dt-radio-label"
        htmlFor={`radio-${props.questionId}-${props.name}`}
      >
        {props.label}
      </label>
      <div className="dt-radio-button" />
    </div>
  );
};

RadioButton.PropTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  questionId: PropTypes.number,
};

export default RadioButton;
