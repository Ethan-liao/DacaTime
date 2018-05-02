import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import R from 'ramda';
import QuestionContainer from '../QuestionContainer';
import { updateField, updateError } from '../../../actions';
import { typeAndPattern } from '../../../util';
import * as DataLists from '../../basic/PlaceLists';

const changeHandler = dispatch => targetKeyPath => event => {
  const value = event.target.value;
  dispatch(updateField(targetKeyPath, value));
};

const TextFieldQuestion = props => {
  const blurHandler = (name, field) => event => {
    event.target.classList.add('attempted');
    if (!event.target.checkValidity() || event.target.value === '') {
      props.dispatch(updateError(name, field, true));
    } else if (props.errors[name]) {
      props.dispatch(updateError(name, field, false));
    }
  };

  const createTextField = ({ label, name }, idx) => {
    const updateKeyPath = [props.name, name];
    const value = R.pathOr('', ['value', name], props);
    const { type, pattern, list, errorMessage } = typeAndPattern(
      props.validators[idx],
    );
    return (
      <div key={idx}>
        {idx === 0 || <br />}

        <p className="control-label">
          {label}
        </p>
        <input
          type={type}
          className="survey-input"
          key={name}
          placeholder={label}
          value={value}
          onChange={changeHandler(props.dispatch)(updateKeyPath)}
          onBlur={blurHandler(props.name, name)}
          list={list}
          pattern={pattern}
        />
        {props.errors[props.name] &&
          props.errors[props.name][name] &&
          <p className="error-message">
            {errorMessage}
          </p>}
        {list &&
          <datalist id={list}>
            {DataLists[props.validators[idx]]}
          </datalist>}
      </div>
    );
  };

  const fields = R.addIndex(R.map)(createTextField)(props.fields);

  return (
    <QuestionContainer {...props}>
      {fields}
    </QuestionContainer>
  );
};
TextFieldQuestion.propTypes = {
  questionId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
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
  errors: state.global.errors,
  ...ownProps,
});

export const component = TextFieldQuestion;
export default connect(mapStateToProps, mapDispatchToProps)(component);
