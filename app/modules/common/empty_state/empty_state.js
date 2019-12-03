import React from 'react';
import PropTypes from 'prop-types';
import './empty_state.scss';

const EmptyState = props => {
  return (
    <div className="empty_state">
      <div className="image">
        <img src="/img/empty-state.png" alt="Empty State"/>
        <div className="text">{props.label}</div>
      </div>
    </div>
  )
};

EmptyState.propTypes = {
  label: PropTypes.string,
};

EmptyState.defaultProps = {
  label: 'No Result Found'
};

export default EmptyState;
