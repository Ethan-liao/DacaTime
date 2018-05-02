import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchSurvey, passcodeAttempt } from '../actions';
// import backgroundPhoto from '../statue-of-liberty-4.jpg';
import Header from './Header';
import Footer from './Footer';
import SubscribeBox from './SubscribeBox';
import Button from './basic/Button';
import Modal from './basic/Modal';

const changeHandler = dispatch => event => {
  const value = event.target.value;
  dispatch(passcodeAttempt(value));
};

class SplashPage extends React.Component {
  constructor(props) {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const isAuthenticated = 'this.props.auth.service.isAuthenticated()';
    const enterButtonText = isAuthenticated
      ? 'Continue your application'
      : 'Start an application';

    const login = this.props.auth.service.login;
    const enterButtonOnClick = isAuthenticated ? null : this.openModal;

    const modal = isAuthenticated
      ? null
      : <div>
          <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
            <div className="centered">
              <h1 className="dt-passcode-header">Please enter the code:</h1>
              <input
                type="password"
                className="dt-passcode-input"
                onChange={changeHandler(this.props.dispatch)}
              />
              <Button
                className="dt-passcode-button"
                onClick={login}
                disabled={this.props.auth.passcode !== 'Democracy'}
              >
                Proceed
              </Button>
            </div>
          </Modal>
        </div>;

    return (
      <div className="splash">
        <Header>
          <Button
            to="mailto:founders@dacatime.com"
            inverted
            className="splash-email-button"
          >
            Email us
          </Button>
        </Header>

        <div className="splash-photo">
          <img alt="" src={backgroundPhoto} />
        </div>

        <div className="splash-container">
          <p className="splash-header">
            This product is in a limited, closed trial.
          </p>

          <p className="splash-text">
            We recommend reviewing the resulting documents with an{' '}
            <span className="splash-text-bold">immigration attorney</span>.
            There may be issues with our software until we have launched a full
            version of our product.
          </p>

          <p className="splash-text">
            Please contact the{' '}
            <a
              className="maillink"
              href="mailto:founders@dacatime.com"
              target="_blank"
            >
              founders
            </a>{' '}
            with any questions, comments, or feedback.
          </p>

          <Button
            to="/application"
            disabled={!this.props.canStart}
            onClick={enterButtonOnClick}
          >
            {enterButtonText}
          </Button>

          <hr />

          <h4
            style={{
              textAlign: 'center',
            }}
          >
            Subscribe for DACA Time updates.
          </h4>

          <SubscribeBox />

          {modal}
        </div>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, surveyId } = this.props;
    dispatch(fetchSurvey(surveyId));
  }

  closeModal() {
    this.props.dispatch(passcodeAttempt(''));
    this.setState({
      modalIsOpen: false,
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }
}

const mapStateToProps = state => {
  return {
    surveyId: state.survey.id,
    canStart: state.survey.groups.length > 0 && !state.survey.isFetching,
    auth: state.auth,
  };
};

SplashPage.propTypes = {
  canStart: PropTypes.bool,
};

export const component = SplashPage;
export default connect(mapStateToProps)(component);
