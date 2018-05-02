import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../basic/Modal';
import { updateField, logOut } from '../../../actions';

const SeekLegalGuidanceDialog = props =>
  <div>
    <Modal
      open={true}
      disableClose={true}
      id="legal-guidance-modal"
      buttons={[
        {
          action: () => props.dispatch(updateField(props.updateKeyPath, '')),
          label: 'Go Back',
        },
        {
          action: () => {
            logOut(props.auth.service, props.dispatch);
            window.open(
              'https://www.google.com/search?q=immigration+legal+aid',
            );
          },
          label: 'Get Help',
        },
      ]}
    >
      <div className="legal-guidance-header">
        <h4>Please Seek Legal Guidance!</h4>
      </div>
      <div className="legal-guidance-body">
        <p>
          Your answer to this question indicates that we cannot handle your case
          and that you should consult with an attorney to see what your best
          options are.
        </p>
        <p>
          If you clicked the wrong button by mistake, click "Go Back" to edit
          your answer. Otherwise, click "Get Help" to be taken to a list of
          attorneys who may be able to help you.
        </p>
      </div>
    </Modal>
  </div>;
SeekLegalGuidanceDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SeekLegalGuidanceDialog,
);
