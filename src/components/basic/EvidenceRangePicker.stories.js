import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EvidenceRangePicker from './EvidenceRangePicker';

storiesOf('DatePicker', module).add('date range', () =>
  <EvidenceRangePicker />,
);
