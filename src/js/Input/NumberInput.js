import React from 'react';
import PropTypes from 'prop-types';

import {Input} from './Input.js';

export function NumberInput(props) {
  const { onChange, value, name } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.value), [onChange, name]);
  return (
    <Input className="NumberInput" {...props}>
      <input type="number" onChange={ handleOnChange } value={ value } />
    </Input>
  );
}

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};