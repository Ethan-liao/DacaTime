import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import Icon from '../../basic/Icon';
import { Link } from 'react-router-dom';
import Progress from '../../basic/Progress';
import Button from '../../basic/Button';
import Sticky from 'react-stickynode';
import { logOut } from '../../../actions';

const SidebarItem = props => {
  const statusIcon = props.completed ? 'fa-check-circle' : null;
  const iconType = props.isExpanded ? 'close' : 'menu';
  if (props.active) {
    return (
      <div className="dt-sidebar-group-inner active">
        {props.children}
        {props.isMobile &&
          <i className="material-icons menu-button" onClick={props.toggleMenu}>
            {iconType}
          </i>}
      </div>
    );
  }

  const expandedClass = props.isExpanded && props.isMobile ? 'expanded' : '';
  const status = props.markForReview && !props.completed ? 'needs-review' : '';
  return (
    <Link
      to={props.to}
      className="dt-sidebar-group-outer"
      onClick={props.isMobile ? props.toggleMenu : null}
    >
      <div
        className={`dt-sidebar-group-inner inactive ${expandedClass} ${status}`}
      >
        {props.isExpanded && props.children}
        {statusIcon &&
          <Icon
            name={statusIcon}
            className={`dt-sidebar-icon ${props.isMobile ? 'mobile' : ''}`}
          />}
      </div>
    </Link>
  );
};

const SideBar = props => {
  const {
    isMobile,
    groups,
    auth,
    dispatch,
    isExpanded,
    toggleMenu,
    activeGroup,
  } = props;

  const navItems = R.map(group => {
    const completed = group.completed / group.size === 1;
    return (
      <SidebarItem
        key={group.name}
        completed={completed}
        active={group.name === activeGroup}
        markForReview={props.wasReviewed && group.name !== 'review'}
        to={`/application/${group.name}`}
        isMobile={isMobile}
        isExpanded={!isMobile || isExpanded}
        toggleMenu={toggleMenu}
      >
        {group.label}
      </SidebarItem>
    );
  })(groups);

  return (
    <Sticky
      enabled={true}
      top={0}
      innerZ={35}
      stickyWrapper={props.stickyWrapper}
    >
      <div className="dt-sidebar" ref={props.stickyWrapper}>
        <Progress completion={props.progress} />
        {navItems}
        <hr />
        {(isExpanded || !isMobile) &&
          <div className="centered logout-button">
            <Button
              inverted
              onClick={() => logOut(auth.service, dispatch)}
              className="sidebar-logout-button"
            >
              Log out
            </Button>
          </div>}
      </div>
    </Sticky>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    auth: state.auth,
    isMobile: state.global.isMobile,
    wasReviewed: state.global.wasReviewed,
  };
};

export const component = SideBar;
export default connect(mapStateToProps, mapDispatchToProps)(component);
