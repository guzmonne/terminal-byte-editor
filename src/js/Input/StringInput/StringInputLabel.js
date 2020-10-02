import React from 'react';
import PropTypes from 'prop-types';

export function StringInputLabel({ tag, label }) {
  return <>{ tag !== undefined && <span>{tag}</span> }{ label }</>
}

StringInputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  tag: PropTypes.string,
};