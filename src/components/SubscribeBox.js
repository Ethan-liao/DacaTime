import React from 'react';

const SubscribeBox = props =>
  <div className="subscribe-box">
    <input
      className="subscribe-box-input"
      type="email"
      autoComplete="email"
      placeholder="Email address"
      disabled
    />
    <div className="subscribe-box-button">
      <div className="subscribe-box-button-text">
        Subscribe <i className="fa fa-envelope" />
      </div>
    </div>
  </div>;

export default SubscribeBox;
