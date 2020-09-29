import React from 'react';

function InputGroup({ title, children, name, isOpen, onToggle }) {
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

function Input(props) {
  const { label, children } = props;
  return (
    <div className="Input StringInput">
      <label>{ label }</label>
      <div className="Input__container">
        { children }
      </div>
    </div>
  );
}

function StringInputLabel({ tag, label }) {
  return <>{ tag !== undefined && <span>{tag}</span> }{ label }</>
}

function StringInput(props) {
  const { onChange, value, multiline=true, tag, label } = props;
  return (
    <Input className="StringInput" {...props} label={ <StringInputLabel tag={ tag } label={label} /> }>
      <textarea rows={value.split('\n').length} onChange={ onChange } value={ value }></textarea>
    </Input>
  );
}

function BooleanInput(props) {
  const { value, onChange, name } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.checked), [onChange, name]);
  return (
    <Input {...props}>
      <input type="checkbox" checked={ value } onChange={ handleOnChange } />
    </Input>
  );
}

function RangeInput(props) {
  const { value, onChange, name, step=0.5, min=0, max=10 } = props;
  const handleOnChange = React.useCallback((e) => onChange(name, e.target.value), [onChange, name]);
  return (
    <Input {...props}>
      <input className="slider" type="range" step={ step } min={ min } max={ max }value={ value } onChange={ handleOnChange } />
      <input className="slider_value" type="text" value={ value } onChange={ handleOnChange } />
    </Input>
  );
}

function SelectInput(props) {
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


function CommandInput({ onChange, command, output, index}) {
  const handleCommandOnChange = React.useCallback((e) => onChange(index, [e.target.value, output]), [index, onChange, output]);
  const handleOutputOnChange = React.useCallback((e) => onChange(index, [command, e.target.value]), [index, onChange, command]);

  return (
    <div className="CommandInput">
      <StringInput tag={`#${index}`} label="Command" value={command} onChange={handleCommandOnChange}/>
      <StringInput tag={`#${index}`} label="Output" value={output} onChange={handleOutputOnChange}/>
    </div>
  );
}

class App extends React.Component {
  GRADIENTS = {
    random:        [],
    vitalOcean:    ['#1CB5E0', '#000851'],
    kaleSalad:     ['#00C9FF', '#92FE9D'],
    discoClub:     ['#FC466B', '#3F5EFB'],
    shadyLane:     ['#3F2B96', '#A8C0FF'],
    retroWagon:    ['#FDBB2D', '#22C1C3'],
    frescoCrush:   ['#FDBB2D', '#3A1C71'],
    cucumberWater: ['#e3ffe7', '#d9e7ff'],
    seaSalt:       ['#4b6cb7', '#182848'],
    parFour:       ['#9ebd13', '#008552'],
    ooeyGooey:     ['#0700b8', '#00ff88'],
    bloodyMimosa:  ['#d53369', '#daae51'],
    lovelyLilly:   ['#efd5ff', '#515ada'],
    aquaSpray:     ['#00d2ff', '#3a47d5'],
    melloYellow:   ['#f8ff00', '#3ad59f'],
    dustyCactus:   ['#fcff9e', '#c67700']
  };

  constructor(props) {
    super(props);
    const defaults = {
      commands: [['echo "Hello, World!"', 'Hello, World!']],
      padding: 1,
      size: 18,
      minSize: 12,
      maxSize: 24,
      prompt: false,
      highlight: false,
      fit: false,
      gradient: 'random',
      gradientRot: 0,
    };
    this.state = {
      ...defaults,
      url: this.createIframeURL(defaults),
      toggle: {
        commands: true,
        configuration: true,
      }
    };
    this.createIframeURL = this.createIframeURL.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChangeCommand = this.onChangeCommand.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onRefreshIframeURL = this.onRefreshIframeURL.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onAdd() {
    this.setState({ commands: [...this.state.commands, ["", ""]] });
  }

  onRemove() {
    if (this.state.commands.length === 1) { return; }
    this.setState({ commands: this.state.commands.slice(0, -1) });
  }

  onChangeCommand(index, value) {
    this.state.commands[index] = value;
    this.setState({ commands: this.state.commands });
  }

  onChangeInput(key, value) {
    this.setState({[key]: value});
  }

  createIframeURL({ commands, gradient, gradientRot, prompt, highlight, fit, padding, size, minSize, maxSize }) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:1235';
    return baseUrl +
      `?commands=${ commands.map(([command]) => utoa(command)).join(',').replace(/=/g, '') }` +
      `&outputs=${ commands.map(([_, output]) => utoa(output)).join(',').replace(/=/g, '') }` +
      (prompt ? '&prompt=true' : '') +
      (fit ? '&fit=true' : '') +
      (highlight ? '&highlight=true' : '') +
      (gradient ? `&gradient=${gradient}` : '') +
      (gradientRot ? `&gradientRot=${gradientRot}` : '') +
      `&padding=${ padding }` +
      `&size=${ size }` +
      `&minSize=${ minSize }` +
      `&maxSize=${ maxSize }` +
      '&id=' + Math.round(Math.random() * 10000, 0);
  }

  onRefreshIframeURL(e) {
    e.preventDefault();
    this.setState({ url: this.createIframeURL(this.state) });
  }

  onToggle(key) {
    const state = this.state.toggle[key];
    this.setState({ toggle: {
      ...this.state.toggle,
      [key]: !state
    }});
  }

  render() {
    const { 
      commands,
      gradient,
      gradientRot,
      padding,
      prompt,
      highlight,
      fit,
      size,
      minSize,
      maxSize,
      url,
      toggle 
    } = this.state;
    return (
      <React.Fragment>
        <header><h1>Terminal Byte Editor</h1></header>
        <article>
          <div className="container">
            <div className="overflow" data-simplebar>
              <form onSubmit={this.onRefreshIframeURL}>
                <InputGroup title="Commands" isOpen={ toggle.commands } onToggle={ this.onToggle } name="commands">
                  {commands.map(([command, output], index) => (
                    <CommandInput 
                      key={index}
                      command={command}
                      onChange={this.onChangeCommand}
                      output={output}
                      index={index}
                      isLast={index === commands.length - 1}
                    />
                  ))}
                  <div className="AddRemoveCommands">
                    <button type="button" onClick={this.onAdd} className="AddRemoveCommands__add">+</button>
                    <button type="button" onClick={this.onRemove} className="AddRemoveCommands__remove">-</button>
                  </div>
                </InputGroup>
                <InputGroup title="Configuration" isOpen={ toggle.configuration } onToggle={ this.onToggle } name="configuration">
                  <BooleanInput label="Prompt" onChange={ this.onChangeInput } name="prompt" value={ prompt } />
                  <BooleanInput label="Highlight" onChange={ this.onChangeInput } name="highlight" value={ highlight } />
                  <BooleanInput label="Fit" onChange={ this.onChangeInput } name="fit" value={ fit } />
                  <RangeInput label="Padding" onChange={ this.onChangeInput } name="padding" value={ padding } />
                  <RangeInput label="Min. Size" onChange={ this.onChangeInput } name="minSize" value={ minSize } step="1" min="1" max="44" />
                  <RangeInput label="Size" onChange={ this.onChangeInput } name="size" value={ size } step="1" min="1" max="44" />
                  <RangeInput label="Max. Size" onChange={ this.onChangeInput } name="maxSize" value={ maxSize } step="1" min="1" max="44" />
                  <SelectInput label="Gradient" onChange={this.onChangeInput} name="gradient" value={ gradient } options={Object.keys(this.GRADIENTS)} />
                  <RangeInput label="Gradient Rot." onChange={ this.onChangeInput } name="gradientRot" value={ gradientRot } step="1" min="0" max="360" />
                </InputGroup>
                <button className="Refresh" type="submit">Refresh</button>
              </form>
            </div>
          </div>
          <section>
            <iframe id="terminal-byte" src={url} title="Terminal Byte"></iframe>
            <div className="share">
              <label>Share: </label>
              <input type="text" value={ url } readOnly/>
            </div>
          </section>
        </article>
        <footer>Made with love by <a href="https://github.com/guzmonne">@guzmonne</a></footer>
      </React.Fragment>
    )
  }
}

export default App;

/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
function atou(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
  return btoa(unescape(encodeURIComponent(data)));
}