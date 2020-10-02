import React from 'react'
import PropTypes from 'prop-types';

export function Input(props) {
  const { label, children } = props;
  return (
    <div className="Input StringInput">
      <label>{ label }</label>
      <div className="Input__container">
        { children }
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};