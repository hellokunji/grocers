import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const Button = props => {
  return (
    <button
      className={classNames('icon_btn', `icon_btn_size_${props.size}`, {
        'loading_icon_btn': props.showLoading,
        'disabled_icon_btn': props.isDisabled
      })}
      style={{width: props.width}}
      onClick={props.onClick || null}
    >
      <div className="icon">
        {props.showLoading ? (
          <img className="loading_icon" src='../../../../../img/loading.svg' alt="loading icon"/>
        ) : (
          <img className="button_icon" src="../../../../../img/plus.png" alt="add icon"/>
        )}
      </div>
      <div className="text">{props.label}</div>
    </button>
  )
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  width: PropTypes.string,
  isDisabled: PropTypes.bool,
  showLoading: PropTypes.bool
};

Button.defaultProps = {
  size: 'm',
  width: 'auto',
  isDisabled: false,
  showLoading: false,
};

export default Button;
