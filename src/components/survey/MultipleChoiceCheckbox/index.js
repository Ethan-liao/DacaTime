import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import Checkbox from '../../basic/Checkbox';
import FormGroup from '../../basic/FormGroup';
import QuestionContainer from '../QuestionContainer';
import { updateField } from '../../../actions';

const NoneKey = 'none';

const changeHandler = (dispatch, targetKeyPath, currentValue) => event => {
  const updatedFlag = event.target.value;
  const value = R.cond([
    [R.contains(updatedFlag), R.without([updatedFlag])],
    [R.always(updatedFlag === NoneKey), R.always([NoneKey])],
    [R.T, R.append(updatedFlag)],
  ])(currentValue);
  dispatch(updateField(targetKeyPath, value));
};

const MultipleChoiceCheckbox = props => {
  const updateKeyPath = [props.name];
  const value = props.value || [];

  const disableAll = R.contains(NoneKey)(value);

  const fields = props.fields.map(({ label, name }) =>
    <Checkbox
      key={name}
      checked={R.contains(name)(value)}
      value={name}
      name={`radio-${props.questionId}`}
      onChange={() => {}}
      disabled={disableAll && name !== NoneKey}
    >
      {label}
    </Checkbox>,
  );

  return (
    <QuestionContainer {...props}>
      <div>
        <FormGroup
          value={value}
          onChange={changeHandler(props.dispatch, updateKeyPath, value)}
        >
          {fields}
        </FormGroup>
      </div>
    </QuestionContainer>
  );
};
MultipleChoiceCheckbox.propTypes = {
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

export const component = MultipleChoiceCheckbox;
export default connect(mapStateToProps, mapDispatchToProps)(component);
