import React from 'react';
import MultipleChoiceQuestion from './index';
import renderer from 'react-test-renderer';
import { radioQuestion } from '../../../util/testData';
import reducer from '../../../reducers';
import { setup } from '../../../util/testUtils';

const { component, store } = setup(
  MultipleChoiceQuestion,
  reducer,
  radioQuestion,
);

it('renders without crashing', () => {
  renderer.create(component);
});

it('renders correctly', () => {
  const renderedComponent = renderer.create(component);
  let tree = renderedComponent.toJSON();

  expect(tree).toMatchSnapshot();
});
