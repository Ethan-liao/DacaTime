import React from 'react';
import MultipleChoiceDropdown from './index';
import { dropDownQuestion } from '../../../util/testData';
import reducer from '../../../reducers/survey';
import { setup } from '../../../util/testUtils';
import renderer from 'react-test-renderer';

const { component } = setup(MultipleChoiceDropdown, reducer, dropDownQuestion);

it('renders without crashing', () => {
  renderer.create(component);
});

it('renders correctly', () => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
