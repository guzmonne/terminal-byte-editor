import React from 'react';
import PropTypes from 'prop-types';

import {Input} from './Input.js';

export function BooleanInput(props) {
  const { value, onChange, name } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.checked), [onChange, name]);
  return (
    <Input {...props}>
      <input id={name} type="checkbox" checked={ value } onChange={ handleOnChange } />
    </Input>
  );
}

BooleanInput.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};