import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import download from 'downloadjs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { saveResponses, attemptReview } from '../actions';
import Button from './basic/Button';
import Panel from './basic/Panel';

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: 0,
    };

    this.updatePageCount = this.updatePageCount.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(attemptReview());
  }

  render() {
    const { incomplete, submitting, form, dispatch, errorMessage } = this.props;

    const requestOptions = {
      url: '/api/form',
      httpHeaders: {
        Authorization: `Bearer ${localStorage.getItem('id_token') || ''}`,
      },
    };
    const pdf =
      !incomplete &&
      !submitting &&
      <Document file={requestOptions} onLoadSuccess={this.updatePageCount}>
        {Array.from(new Array(this.state.numPages), (el, index) =>
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={Math.min(600, document.body.clientWidth - 52)}
          />,
        )}
      </Document>;

    return (
      <div className="dt-panel">
        {incomplete &&
          <h3>
            Your application is not yet ready to submit. Please review your
            application and complete any unanswered questions.
          </h3>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            inverted
            className="submit-application-button"
            disabled={incomplete}
            onClick={() => saveResponses(form, dispatch)}
          >
            Refresh the Preview
          </Button>
          <Button
            inverted
            className="download-application-button"
            disabled={submitting || incomplete}
            onClick={() => this.downloadPdf()}
          >
            Download Watermarked PDF
          </Button>
        </div>
        {errorMessage &&
          <Panel className="alert-panel">
            {errorMessage}
          </Panel>}

        {pdf}
      </div>
    );
  }

  updatePageCount({ numPages }) {
    this.setState({
      numPages,
    });
  }

  downloadPdf() {
    fetch('/api/form', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token') || ''}`,
      },
    })
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        download(blob, 'application.pdf');
      });
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  form: state.form,
  submitting: state.submission.isSubmitting,
  errorMessage: state.submission.errors && state.submission.message,
});

ReviewPage.propTypes = {
  submitting: PropTypes.bool,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  errorMessage: PropTypes.bool,
  incomplete: PropTypes.bool,
};

export const component = ReviewPage;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component),
);
