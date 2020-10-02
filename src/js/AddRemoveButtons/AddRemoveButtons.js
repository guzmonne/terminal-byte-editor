import React from 'react';
import PropTypes from 'prop-types';

export function AddRemoveButtons({onAdd, onRemove}) {
  return (
    <div className="AddRemoveButtons">
      <button type="button" onClick={onAdd} className="AddRemoveButtons__add">+</button>
      <button type="button" onClick={onRemove} className="AddRemoveButtons__remove">-</button>
    </div>
  )
}

AddRemoveButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};