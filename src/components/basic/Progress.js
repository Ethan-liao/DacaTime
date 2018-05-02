import React from 'react';
import PropTypes from 'prop-types';

const CompletionBar = props => {
  return (
    <div
      className="dt-progress-bar"
      style={{
        width: `${Math.floor(props.completion * 100)}%`,
      }}
    />
  );
};

const Progress = props =>
  <div className="dt-progress">
    <div className="dt-progress-bar-container">
      <CompletionBar completion={props.completion} />
    </div>
    <div className="dt-progress-label-container">
      <div className="dt-progress-label">Progress</div>
      <div className="dt-progress-completion">
        {Math.floor(props.completion * 100)}% complete
      </div>
    </div>
  </div>;

CompletionBar.propTypes = {
  completion: PropTypes.number,
};

Progress.propTypes = {
  completion: PropTypes.number,
};

export default Progress;
