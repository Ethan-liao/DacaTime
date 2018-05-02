import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SideBar from './index';
import { setup } from '../../../util/testUtils';
import reducer from '../../../reducers';

const props = {
  groups: [
    {
      label: 'Demographic Information',
      name: 'demographicInformation',
      size: 3,
      completed: 2,
      active: true,
    },
    {
      label: 'Criminal History',
      name: 'criminalHistory',
      size: 5,
      completed: 0,
    },
    { label: 'Finished group', name: 'finishedInfo', size: 3, completed: 3 },
  ],

  activeGroup: 'demographicInformation',
};

const { component } = setup(SideBar, reducer, props);

storiesOf('SideBar', module).add('generate from groups', () => component);
