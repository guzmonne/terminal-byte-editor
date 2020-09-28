import React from 'react';

function InputGroup({ title, children, name, isOpen, onToggle }) {
  const handlOnToggle = React.useCallback(() => onToggle(name), [onToggle, name]);
  return (
    <div className={`InputGroup ${isOpen === true ? 'InputGroup__opened' : ''}`}>
      <button className="InputGroup__header" onClick={handlOnToggle}>
        { title }
        <div className="InputGroup__header-chevron"></div>
      </button>
      <div className="InputGroup__container">
        { children }
      </div>
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
      {multiline 
        ? <textarea rows={value.split('\n').length} onChange={ onChange } value={ value }></textarea>
        : <input type="text" onChange={ onChange } value={ value } />
      }
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
  constructor(props) {
    super(props);
    const defaults = {
      commands: [['echo "Hello, World!"', 'Hello, World!']],
      padding: 1,
      prompt: false,
      highlight: false,
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
    this.onChangeBool = this.onChangeBool.bind(this);
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

  onChangeBool(key, value) {
    this.setState({[key]: value});
  }

  createIframeURL({ commands, prompt, highlight }) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:1235';
    return baseUrl +
      `?commands=${ commands.map(([command]) => utoa(command)).join(',').replace(/=/g, '') }` +
      `&outputs=${ commands.map(([_, output]) => utoa(output)).join(',').replace(/=/g, '') }` +
      (prompt ? '&prompt=true' : '') +
      (highlight ? '&highlight=true' : '')
  }

  onRefreshIframeURL() {
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
    const { commands, prompt, highlight, url, toggle } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <header><h1>Terminal Byte Editor</h1></header>
        <article>
          <aside>
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
                <button onClick={this.onAdd} className="AddRemoveCommands__add">+</button>
                <button onClick={this.onRemove} className="AddRemoveCommands__remove">-</button>
              </div>
            </InputGroup>
            <InputGroup title="Configuration" isOpen={ toggle.configuration } onToggle={ this.onToggle } name="configuration">
              <BooleanInput label="Prompt" onChange={ this.onChangeBool } name="prompt" value={ prompt } />
              <BooleanInput label="Highlight" onChange={ this.onChangeBool } name="highlight" value={ highlight } />
            </InputGroup>
            <button className="Refresh" onClick={this.onRefreshIframeURL} type="button">Refresh</button>
          </aside>
          <section>
            <iframe id="terminal-byte" src={url} title="Terminal Byte"></iframe>
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