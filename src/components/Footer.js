import React from 'react';
import Icon from './basic/Icon';
import PropTypes from 'prop-types';

const FooterIcon = props =>
  <a href={props.to} target="_blank" className="footer-icon">
    <Icon name={props.icon} />
  </a>;

const Footer = props =>
  <div className="dt-footer">
    <div className="footer-copyright">© 2017 DACA Time</div>

    <div className="footer-icons">
      <FooterIcon
        icon="fa-linkedin-square"
        to="https://www.linkedin.com/company-beta/16239576"
      />
      <FooterIcon icon="fa-medium" to="https://medium.com/daca-time" />
      <FooterIcon icon="fa-twitter" to="https://twitter.com/dacatime" />
      <FooterIcon icon="fa-facebook" to="https://www.facebook.com/dacatime/" />
    </div>
  </div>;

FooterIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Footer;
