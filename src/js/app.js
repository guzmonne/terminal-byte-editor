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

function StringInput({ label, tag, value, onChange=()=>{} }) {
  return (
    <div className="Input StringInput">
      <label>{ tag !== undefined && <span>{tag}</span> }{ label }</label>
      <div className="Input__container">
        <textarea type="text" onChange={ onChange } value={ value }></textarea>
      </div>
    </div>
  );
}

function CommandInput({ command, output, index, isLast=false}) {
  return (
    <div className="CommandInput">
      <StringInput tag={`#${index}`} label="Command" value={command} />
      <StringInput tag={`#${index}`} label="Output" value={output} />
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