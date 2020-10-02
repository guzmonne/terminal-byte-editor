import React from 'react';
import PropTypes from 'prop-types';

import {Input} from './Input.js';

export function SelectInput(props) {
  const { value, onChange, name, options } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.value), [onChange, name]);
  return (
    <Input {...props}>
      <select value={ value } onChange={ handleOnChange }>
        {options.map(option => <option key={option} value={ option }>{ option }</option>)}
      </select>
    </Input>
  );
}

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};