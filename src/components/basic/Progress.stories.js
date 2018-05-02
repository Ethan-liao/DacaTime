import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Progress from './Progress';

storiesOf('Progress', module)
  .add('0%', () => <Progress completion={0.0} style={{ width: 200 }} />)
  .add('40%', () => <Progress completion={0.4} style={{ width: 200 }} />)
  .add('100%', () => <Progress completion={1.0} style={{ width: 200 }} />);
