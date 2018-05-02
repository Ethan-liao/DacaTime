import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { component as TextFieldQuestion } from './index';
import { loremIpsum } from '../../../stories/util';

storiesOf('Text field question', module).add('name input', () =>
  <TextFieldQuestion
    questionId={1}
    name="name"
    prompt="What is your name?"
    fields={[
      { label: 'First name', name: 'fname' },
      { label: 'Middle name', name: 'mname' },
      { label: 'Last name', name: 'lname' },
    ]}
    explanation="Last name is also known as family name."
    dispatch={action('updated-field')}
  />,
);
