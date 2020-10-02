import React from 'react';
import PropTypes from 'prop-types';

import {StringInput} from '../StringInput/';

export function CommandInput({ onChange, command, output, index}) {
  const handleCommandOnChange = React.useCallback((e) => onChange(index, [e.target.value, output]), [index, onChange, output]);
  const handleOutputOnChange = React.useCallback((e) => onChange(index, [command, e.target.value]), [index, onChange, command]);

  return (
    <div className="CommandInput">
      <StringInput tag={`#${index}`} label="Command" value={command} onChange={handleCommandOnChange}/>
      <StringInput tag={`#${index}`} label="Output" value={output} onChange={handleOutputOnChange}/>
    </div>
  );
}

CommandInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};