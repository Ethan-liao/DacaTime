import React from 'react';
import SurveyGroup from './index';
import renderer from 'react-test-renderer';
import { surveyGroup } from '../../../util/testData';
import reducer from '../../../reducers';
import { setup } from '../../../util/testUtils';

const props = {
  previous: null,
  next: null,
  questions: surveyGroup.questions,
  id: surveyGroup.id,
};
const { component, store } = setup(SurveyGroup, reducer, props);

it('renders without crashing', () => {
  renderer.create(component);
});

it('renders correctly', () => {
  const renderedComponent = renderer.create(component);
  let tree = renderedComponent.toJSON();

  expect(tree).toMatchSnapshot();
});
