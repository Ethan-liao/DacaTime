import React from 'react';
import { combineReducers } from 'redux';
import TextFieldQuestion from './index';
import { textQuestion } from '../../../util/testData';
import reducer from '../../../reducers';
import { setup } from '../../../util/testUtils';
import renderer from 'react-test-renderer';

const { component } = setup(TextFieldQuestion, reducer, textQuestion);

it('renders without crashing', () => {
  renderer.create(component);
});

it('renders correctly', () => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
