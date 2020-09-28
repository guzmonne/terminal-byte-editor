import React from 'react';

function InputGroup({ title, children }) {
  return (
    <div className="InputGroup">
      <button className="InputGroup__header">
        { title }
        <div className="InputGroup__header-chevron"></div>
      </button>
      <div className="InputGroup__container">
        { children }
      </div>
    </div>
  );
}

function StringInput({ label, tag, value, onChange }) {
  return (
    <div className="Input StringInput">
      <label>{ tag !== undefined && <span>{tag}</span> }{ label }</label>
      <div className="Input__container">
        <textarea rows={value.split('\n').length}  type="text" onChange={ onChange } value={ value }></textarea>
      </div>
    </div>
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
    this.state = {
      commands: [['', '']],
      url: process.env.BASE_URL || 'http://localhost:1235',
    };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChangeCommand = this.onChangeCommand.bind(this);
    this.onRefreshIframeURL = this.onRefreshIframeURL.bind(this);
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

  onRefreshIframeURL() {
    const { commands } = this.state;
    const baseUrl = process.env.BASE_URL || 'http://localhost:1235';
    const url = baseUrl +
      `?commands=${ commands.map(([command]) => utoa(command)).join(',').replace(/=/g, '') }` +
      `&outputs=${ commands.map(([_, output]) => utoa(output)).join(',').replace(/=/g, '') }`
    this.setState({ url });
  }

  render() {
    const { commands, url } = this.state;
    return (
      <React.Fragment>
        <header><h1>Terminal Byte Editor</h1></header>
        <article>
          <aside>
            <InputGroup title="Commands">
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