import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const isInternal = (path: string): boolean => {
  return path.startsWith('/');
};

const Button = props => {
  const className = (props.inverted
    ? ['dt-button', 'inverted', props.className]
    : ['dt-button', props.className]).join(' ');

  if (props.disabled) {
    return (
      <div className={className + ' dt-button-disabled'}>
        <div className="dt-button-text">
          {props.children}
        </div>
      </div>
    );
  } else if (props.onClick) {
    return (
      <div onClick={props.onClick} className={className}>
        <div className="dt-button-text">
          {props.children}
        </div>
      </div>
    );
  } else if (props.to && isInternal(props.to)) {
    return (
      <Link to={props.to} className={className}>
        <div className="dt-button-text">
          {props.children}
        </div>
      </Link>
    );
  } else {
    return (
      <a href={props.to} target="_blank" className={className}>
        <div className="dt-button-text">
          {props.children}
        </div>
      </a>
    );
  }
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  inverted: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
