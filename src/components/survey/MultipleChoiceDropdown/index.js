import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionContainer from '../QuestionContainer';
import { updateField } from '../../../actions';

const changeHandler = dispatch => targetKeyPath => event => {
  const value = event.target.value;
  dispatch(updateField(targetKeyPath, value));
};

const MultipleChoiceDropdown = props => {
  const updateKeyPath = [props.name];
  const value = props.value || '';

  const fields = props.fields.map(({ label, name }) =>
    <option key={name} value={name}>
      {label}
    </option>,
  );

  return (
    <QuestionContainer {...props}>
      <select
        className="survey-select"
        onChange={changeHandler(props.dispatch)(updateKeyPath)}
        value={value}
      >
        <option key={''} value="">
          Select a choice...
        </option>
        {fields}
      </select>
    </QuestionContainer>
  );
};
MultipleChoiceDropdown.propTypes = {
  questionId: PropTypes.number.isRequired,
  prompt: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, ownProps) => ({
  value: state.form[ownProps.name],
  ...ownProps,
});

export const component = MultipleChoiceDropdown;
export default connect(mapStateToProps, mapDispatchToProps)(component);
