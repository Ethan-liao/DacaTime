import React from 'react';
import Button from './basic/Button';

const SubmitPage = props =>
  <div className="jumbotron">
    <h1>That's it for now!</h1>

    <Button to="/" className="submit-page-button">
      Restart Demo
    </Button>
    <Button to="https://dacatime.com" className="submit-page-button">
      Visit Homepage
    </Button>
  </div>;

export default SubmitPage;
