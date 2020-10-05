import React from 'react';
import PropTypes from 'prop-types';

import {Input} from '../Input.js';
import {StringInputLabel} from './StringInputLabel.js';

export function StringInput(props) {
  const { onChange, value, tag, label, name } = props;
  const rows = React.useMemo(() => value.split('\n').length, [value]);
  return (
    <Input className="StringInput" {...props} label={ <StringInputLabel tag={ tag } label={label} /> }>
      <textarea id={name} rows={rows} onChange={ onChange } value={ value }></textarea>
    </Input>
  );
}

StringInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tag: PropTypes.string,
}


