import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import R from 'ramda';
import SideBar from './index';
import { calculateDisplayQuestions } from '../../../interpreter';
import { fullSurvey } from '../../../util/testData';
import reducer from '../../../reducers';
import { mount } from 'enzyme';
import { setup } from '../../../util/testUtils';

const sideBarGroups = fullSurvey.groups.map(group => {
  const questions = calculateDisplayQuestions({}, group.questions);

  return {
    label: group.label,
    name: group.name,
    size: questions.length,
    completed: R.filter(q => q.name in {}, questions).length,
  };
});

const { store } = setup(SideBar, reducer);
const history = createBrowserHistory();
const component = (
  <Provider store={store}>
    <Router history={history}>
      <SideBar groups={sideBarGroups} activeGroup={'basicRequirements'} />
    </Router>
  </Provider>
);

it('renders without crashing', () => {
  mount(component);
});
