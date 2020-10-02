import React from 'react';
import PropTypes from 'prop-types';

import {Input} from '../Input.js';
import {StringInputLabel} from './StringInputLabel.js';

export function StringInput(props) {
  const { onChange, value, tag, label } = props;
  const rows = React.useMemo(() => value.split('\n').length, [value]);
  return (
    <Input className="StringInput" {...props} label={ <StringInputLabel tag={ tag } label={label} /> }>
      <textarea rows={rows} onChange={ onChange } value={ value }></textarea>
    </Input>
  );
}

StringInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tag: PropTypes.string,
}


