import React from 'react';
import PropTypes from 'prop-types';

export function InputGroup({ title, name, isOpen, onToggle, children }) {
  const handlOnToggle = React.useCallback(() => onToggle(name), [onToggle, name]);
  return (
    <div className={`InputGroup ${isOpen === true ? 'InputGroup__opened' : ''}`}>
      <button type="button" className="InputGroup__header" onClick={handlOnToggle}>
        { title }
        <div className="InputGroup__header-chevron"></div>
      </button>
      {isOpen && <div className="InputGroup__container">
        { children }
      </div>}
    </div>
  );
}

InputGroup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
}