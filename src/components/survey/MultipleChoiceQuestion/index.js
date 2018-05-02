import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionContainer from '../QuestionContainer';
import { updateField } from '../../../actions';
import RadioButton from '../../basic/RadioButton';

const changeHandler = dispatch => targetKeyPath => event => {
  const value = event.target.value;
  dispatch(updateField(targetKeyPath, value));
};

const MultipleChoiceQuestion = props => {
  const updateKeyPath = [props.name];
  const value = props.value || '';

  const fields = props.fields.map(({ label, name }) =>
    <RadioButton
      key={name}
      name={name}
      label={label}
      questionId={props.questionId}
      value={value}
    />,
  );

  const className =
    fields.length > 2
      ? 'dt-question-container-vertical'
      : 'dt-question-container-horizontal';

  return (
    <QuestionContainer {...props}>
      <div
        className={className}
        value={value}
        onChange={changeHandler(props.dispatch)(updateKeyPath)}
      >
        {fields}
      </div>
    </QuestionContainer>
  );
};
MultipleChoiceQuestion.propTypes = {
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

export const component = MultipleChoiceQuestion;
export default connect(mapStateToProps, mapDispatchToProps)(component);
