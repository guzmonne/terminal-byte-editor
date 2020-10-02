import React from 'react';
import PropTypes from 'prop-types';

import {Input} from './Input.js';

export function RangeInput(props) {
  const { value, onChange, name, step=0.5, min=0, max=10 } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.value), [onChange, name]);
  return (
    <Input {...props}>
      <input className="slider" type="range" step={ step } min={ min } max={ max }value={ value } onChange={ handleOnChange } />
      <input className="slider_value" type="text" value={ value } onChange={ handleOnChange } />
    </Input>
  );
}

RangeInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};