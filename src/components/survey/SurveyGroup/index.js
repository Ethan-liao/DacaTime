import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import TextFieldQuestion from '../TextFieldQuestion';
import MultipleChoiceQuestion from '../MultipleChoiceQuestion';
import MultipleChoiceDropdown from '../MultipleChoiceDropdown';
import MultipleChoiceCheckbox from '../MultipleChoiceCheckbox';
import SeekLegalGuidanceDialog from '../LegalGuidance';
import Button from '../../basic/Button';

const createQuestionElem = props =>
  R.cond([
    [
      R.pathEq(['questionType'], 'redFlag'),
      obj =>
        <SeekLegalGuidanceDialog
          show={props.value && props.value[obj.name] === props.redFlagAnswer}
          key={Math.random()}
          updateKeyPath={[obj.name]}
        />,
    ],
    [
      R.pathEq(['questionType'], 'text'),
      obj =>
        <TextFieldQuestion
          value={props.value && props.value[obj.name]}
          key={obj.questionId}
          {...obj}
        />,
    ],
    [
      R.pathEq(['questionType'], 'mcRadio'),
      obj =>
        <MultipleChoiceQuestion
          value={props.value && props.value[obj.name]}
          key={obj.questionId}
          {...obj}
        />,
    ],
    [
      R.pathEq(['questionType'], 'mcDropdown'),
      obj =>
        <MultipleChoiceDropdown
          value={props.value && props.value[obj.name]}
          key={obj.questionId}
          {...obj}
        />,
    ],
    [
      R.pathEq(['questionType'], 'mcCheckbox'),
      obj =>
        <MultipleChoiceCheckbox
          value={props.value && props.value[obj.name]}
          key={obj.questionId}
          {...obj}
        />,
    ],
    [R.T, _ => <h1>Unrecognized question type</h1>],
  ]);

export const SurveyGroup = props => {
  const questionElems = R.map(
    createQuestionElem(props),
    R.sortBy(R.prop('questionId'), props.questions),
  );
  const previousLocation = `/application/${props.previous || ''}`;
  const nextLocation = `/application/${props.next || ''}`;
  return (
    <div className="dt-survey-group-inner-container">
      {questionElems}
      <div className="dt-survey-group-button-container">
        <Button to={previousLocation} disabled={!props.previous}>
          Previous
        </Button>

        <Button to={nextLocation} disabled={!props.next}>
          Next
        </Button>
      </div>
    </div>
  );
};
SurveyGroup.propTypes = {
  id: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      questionType: PropTypes.oneOf([
        'mcRadio',
        'mcDropdown',
        'mcCheckbox',
        'text',
        'redFlag',
      ]),
      questionId: PropTypes.number.isRequired,
      prompt: PropTypes.string.isRequired,
      explanation: PropTypes.string,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          inputType: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  value: state.form,
});

export const component = SurveyGroup;

export default connect(mapStateToProps)(component);
