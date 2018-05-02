import React from 'react';
import QuestionContainer from './index';
import renderer from 'react-test-renderer';
import { questionWithExplanation } from '../../../util/testData';
import reducer from '../../../reducers';
import { setup } from '../../../util/testUtils';

const { component, store } = setup(
  QuestionContainer,
  reducer,
  questionWithExplanation,
);

it('renders without crashing', () => {
  renderer.create(component);
});

it('renders correctly', () => {
  const renderedComponent = renderer.create(component);
  let tree = renderedComponent.toJSON();

  expect(tree).toMatchSnapshot();
});
