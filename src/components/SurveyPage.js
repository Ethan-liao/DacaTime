import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import SurveyGroup from './survey/SurveyGroup';
import SideBar from './survey/SideBar';
import { fetchSurvey } from '../actions';
import ReviewPage from './ReviewPage';
import { calculateDisplayQuestions } from '../interpreter';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sideBarIsExpanded: false };
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    const outerWrapper = this.stickyWrapper.parentNode.parentNode;
    this.setState({ sideBarIsExpanded: !this.state.sideBarIsExpanded });
    outerWrapper.style.height = this.state.sideBarIsExpanded ? '128px' : '0px';
  }

  componentDidMount() {
    const { id, dispatch } = this.props;
    if (this.props.groups.length === 0 && !this.props.isFetching) {
      dispatch(fetchSurvey(id));
    }
  }

  render() {
    const props = this.props;
    const review = props.activeGroup === 'review';
    const activeIndex = R.findIndex(
      R.pathEq(['name'], props.activeGroup),
      props.groups,
    );
    const activeGroup = props.groups[activeIndex];
    const authenticated = props.auth.service.isAuthenticated();
    const redirect =
      review || activeGroup
        ? null
        : R.pathOr(null, ['name'], R.head(props.groups));

    const surveyId = activeGroup && activeGroup.id;
    const questions =
      activeGroup &&
      calculateDisplayQuestions(props.form, activeGroup.questions);

    const previousGroup =
      activeIndex > 0 ? props.groups[activeIndex - 1].name : null;

    const nextGroup =
      activeIndex + 1 < props.groups.length
        ? props.groups[activeIndex + 1].name
        : 'review';

    const sidebarGroups = props.groups.map(group => {
      const questions = calculateDisplayQuestions(props.form, group.questions);

      return {
        label: group.label,
        name: group.name,
        size: questions.length,
        completed: R.filter(
          q =>
            q.name in props.form &&
            (q.questionType !== 'text' ||
              !props.errors[q.name] ||
              R.all(R.equals(false))(R.values(props.errors[q.name]))),
          questions,
        ).length,
      };
    });
    const finishedGroups = sidebarGroups.filter(
      group => group.completed === group.size,
    ).length;
    const totalGroups = props.groups.length;
    const progress = finishedGroups / totalGroups || 0.0;

    sidebarGroups.push({
      label: 'Review & Submit',
      name: 'review',
      size: 0,
      completed: false,
    });

    return (
      <div className="survey-page">
        <Header>
          <p className="dt-header-learn-more">
            This software is in Beta.&nbsp;
            <a href="https://dacatime.com" target="_blank">
              Learn More
            </a>
          </p>
        </Header>
        <div className="survey-page-container">
          <SideBar
            groups={sidebarGroups}
            progress={progress}
            activeGroup={props.activeGroup}
            toggleMenu={this.toggleSideBar}
            isExpanded={this.state.sideBarIsExpanded}
            stickyWrapper={el => (this.stickyWrapper = el)}
          />
          <div className="survey-group-container">
            {questions &&
              (!this.state.sideBarIsExpanded || !this.props.isMobile) &&
              <SurveyGroup
                id={surveyId}
                questions={questions}
                previous={previousGroup}
                next={nextGroup}
              />}
            {review &&
              (!this.state.sideBarIsExpanded || !this.props.isMobile) &&
              <ReviewPage incomplete={finishedGroups !== totalGroups} />}
            {!authenticated && <Redirect to="/" />}
            {authenticated &&
              redirect &&
              <Redirect to={`/application/${redirect}`} />}
          </div>
        </div>
        {!this.state.sideBarIsExpanded && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { survey, form } = state;
  const minimalSurveyState = survey.id
    ? survey
    : {
        id: 0,
        groups: [],
      };

  return {
    ...minimalSurveyState,
    form,
    activeGroup: ownProps.match.params.portion,
    auth: state.auth,
    errors: state.global.errors,
    isMobile: state.global.isMobile,
  };
};

SurveyPage.propTypes = {
  activeGroup: PropTypes.string,
  groups: PropTypes.array,
  form: PropTypes.object,
  action: PropTypes.string,
  id: PropTypes.number,
};

export const component = SurveyPage;
export default connect(mapStateToProps)(component);
