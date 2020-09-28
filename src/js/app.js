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

function AddRemoveCommands({onAdd, onRemove}) {
  return (
    <div className="AddRemoveCommands">
      <button onClick={onAdd} className="AddRemoveCommands__add">+</button>
      <button onClick={onRemove} className="AddRemoveCommands__remove">-</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: [['', '']],
    };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChangeCommand = this.onChangeCommand.bind(this);
  }

  onAdd() {
    this.setState({
      commands: [...this.state.commands, ["", ""]],
    });
  }

  onRemove() {
    if (this.state.commands.length === 1) { return; }
    this.setState({
      commands: this.state.commands.slice(0, -1)
    });
  }

  onChangeCommand(index, value) {
    const newCommands = [...this.state.commands];
    newCommands[index] = value;
    this.setState({ commands: newCommands });
  }

  render() {
    const { commands } = this.state;
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
              <AddRemoveCommands onAdd={this.onAdd} onRemove={this.onRemove} />
            </InputGroup>
          </aside>
          <section>
            <iframe id="terminal-byte" src="http://localhost:1235" title="Terminal Byte"></iframe>
          </section>
        </article>
        <footer>Made with love by <a href="https://github.com/guzmonne">@guzmonne</a></footer>
      </React.Fragment>
    )
  }
}

export default App;