import React from 'react';
import Button from './Button';
import Icon from './Icon';
import PropTypes from 'prop-types';

const Modal = props => {
  if (!props.open) {
    return null;
  }

  const buttons = props.buttons
    ? props.buttons
    : [{ action: props.onClose, label: 'Close' }];
  return (
    <div
      className="dt-modal-background"
      id="background"
      onClick={props.onClose}
    >
      <div className="dt-modal-container">
        <div
          className="dt-modal"
          id={props.id || ''}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {props.children}
          <div className="centered dt-modal-button-container">
            {buttons.map((btn, i) =>
              <Button key={i} onClick={btn.action}>
                {btn.label}
              </Button>,
            )}
          </div>
          {!props.disableClose &&
            <div
              className="dt-modal-corner-close-button"
              onClick={props.onClose}
            >
              <Icon name="fa-close" />
            </div>}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
