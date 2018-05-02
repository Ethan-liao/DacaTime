import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { component as MultipleChoiceQuestion } from './index';
import { loremIpsum } from '../../../stories/util';

storiesOf('Multiple choice question (radio)', module)
  .add('two choices, no explanation', () =>
    <MultipleChoiceQuestion
      questionId={1}
      name="mc-question"
      prompt="What's your favorite side of a coin?"
      fields={[
        { label: 'Heads', name: 'heads' },
        { label: 'Tails', name: 'tails' },
      ]}
      dispatch={action('updated-field')}
    />,
  )
  .add('two choices, with explanation', () =>
    <MultipleChoiceQuestion
      questionId={1}
      name="mc-question"
      prompt="What's your favorite side of a coin?"
      fields={[
        { label: 'Heads', name: 'heads' },
        { label: 'Tails', name: 'tails' },
      ]}
      explanation="Flipping coins is very complicated, so let me explain it to you..."
      dispatch={action('updated-field')}
    />,
  )
  .add('five choices, with explanation', () =>
    <MultipleChoiceQuestion
      questionId={1}
      name="mc-question"
      prompt="What's your favorite protein?"
      fields={[
        { label: 'Chicken', name: 'chicken' },
        { label: 'Beef', name: 'beef' },
        { label: 'Turkey', name: 'turkey' },
        { label: 'Soy', name: 'soy' },
        { label: 'Pork', name: 'Pork' },
      ]}
      explanation={loremIpsum}
      dispatch={action('updated-field')}
    />,
  );
