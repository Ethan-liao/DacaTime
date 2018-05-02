import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SeekLegalGuidanceDialog from './index';
import { loremIpsum } from '../../../stories/util';

storiesOf('Seek legal guidance', module).add('dialog is visible', () =>
  <SeekLegalGuidanceDialog show={true} />,
);
