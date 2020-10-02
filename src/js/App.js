import React from 'react';
import SimpleBar from 'simplebar-react'
import Clipboard from 'react-clipboard.js';
import Tippy from '@tippyjs/react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import logo from '../images/logo.png';
import {InputGroup} from './InputGroup/';
import {NumberInput, BooleanInput, RangeInput, SelectInput, CommandInput} from './Input/';
import {AddRemoveButtons} from './AddRemoveButtons/'

export class App extends React.Component {
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

  OVERLAY_SCROLLBARS_OPTIONS = {
    updateOnLoad: ['iframe'],
    scrollbars: {
      visibility: 'visible',
      autoHide: 'never',
    }
  }

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
      iframeWidth: 0,
      iframeHeight: 0,
      ratio: 40
    };
    this.state = {
      ...defaults,
      url: this.createIframeURL(defaults),
      toggle: {
        commands: true,
        configuration: true,
      }
    };
    this.iframeRef = React.createRef();
    this.overflowRef = React.createRef();
    this.createIframeURL    = this.createIframeURL.bind(this);
    this.onAdd              = this.onAdd.bind(this);
    this.onRemove           = this.onRemove.bind(this);
    this.onChangeCommand    = this.onChangeCommand.bind(this);
    this.onChangeInput      = this.onChangeInput.bind(this);
    this.onRefreshIframeURL = this.onRefreshIframeURL.bind(this);
    this.onToggle           = this.onToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      iframeWidth: this.iframeRef.current.offsetWidth,
      iframeHeight: this.iframeRef.current.offsetHeight,
    });
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
    return (window.BASE_URL || 'http://localhost:1235') +
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

  createIframeHTML({url, iframeWidth, iframeHeight}) {
    return `<iframe src="${url}" width="${iframeWidth}" height="${iframeHeight}"></iframe>`
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
      iframeWidth,
      iframeHeight,
      url,
      toggle,
      ratio
    } = this.state;
    return (
      <React.Fragment>
        <header><h1><img alt="Terminal Byte Editor" src={logo} /><span>Terminal Byte Editor</span></h1></header>
        <article>
          <section className="container" style={{width: ratio + '%'}}>
            <form onSubmit={this.onRefreshIframeURL}>
              <SimpleBar className="overflow">
                <InputGroup title="Commands" isOpen={ toggle.commands } onToggle={ this.onToggle } name="commands">
                  {commands.map(([command, output], index) => (
                    <CommandInput  key={index} command={command} onChange={this.onChangeCommand} output={output} index={index} />
                  ))}
                  <AddRemoveButtons onAdd={this.onAdd} onRemove={this.onRemove} />
                </InputGroup>
                <InputGroup title="Configuration" isOpen={ toggle.configuration } onToggle={ this.onToggle } name="configuration">
                  <BooleanInput label="Prompt" onChange={ this.onChangeInput } name="prompt" value={ prompt } />
                  <BooleanInput label="Highlight" onChange={ this.onChangeInput } name="highlight" value={ highlight } />
                  <BooleanInput label="Fit" onChange={ this.onChangeInput } name="fit" value={ fit } />
                  <RangeInput label="Padding" onChange={ this.onChangeInput } name="padding" value={ padding } />
                  <RangeInput label="Min. Size" onChange={ this.onChangeInput } name="minSize" value={ minSize } step={1} min={1} max={100} />
                  <RangeInput label="Size" onChange={ this.onChangeInput } name="size" value={ size } step={1} min={1} max={100} />
                  <RangeInput label="Max. Size" onChange={ this.onChangeInput } name="maxSize" value={ maxSize } step={1} min={1} max={100} />
                  <SelectInput label="Gradient" onChange={this.onChangeInput} name="gradient" value={ gradient } options={Object.keys(this.GRADIENTS)} />
                  <RangeInput label="Gradient Rot." onChange={ this.onChangeInput } name="gradientRot" value={ gradientRot } step={1} min={0} max={360} />
                </InputGroup>
                <InputGroup title="Iframe" isOpen={toggle.iframe} onToggle={this.onToggle} name="iframe">
                  <NumberInput label="Width" onChange={ this.onChangeInput } name="iframeWidth" value={iframeWidth} />
                  <NumberInput label="Height" onChange={ this.onChangeInput } name="iframeHeight" value={iframeHeight} />
                </InputGroup>
              </SimpleBar>
              <button className="Refresh" type="submit">Refresh</button>
            </form>
          </section>
          <section className="iframe" style={{width: 100 - ratio + '%'}}>
            <div className="iframe-container">
              <OverlayScrollbarsComponent options={this.OVERLAY_SCROLLBARS_OPTIONS}>
                <iframe style={{
                    width: iframeWidth ? iframeWidth + 'px' : '100%',
                    height: iframeHeight ? iframeHeight + 'px' : '100%',
                  }}
                  ref={this.iframeRef} 
                  id="terminal-byte" 
                  src={url} 
                  title="Terminal Byte"
                  scrolling="yes"
                />
              </OverlayScrollbarsComponent>
              <div className="iframe-share">
                <label>Share: </label>
                <input type="text" value={url} readOnly/>
                <Tippy content="Copy">
                  <span>
                    <Clipboard data-clipboard-text={url}>
                      <i className="fa fa-clipboard"></i>
                    </Clipboard>
                  </span>
                </Tippy>
                <Tippy content="Embed">
                  <span>
                    <Clipboard data-clipboard-text={this.createIframeHTML({url, iframeHeight, iframeWidth})}>
                      <i className="fa fa-window-frame"></i>
                    </Clipboard>
                  </span>
                </Tippy>
                <Tippy content="Open">
                  <a className="button" alt="Terminal Byte direct link" target="_blank" href={url}>
                    <i className="fa fa-external-link"></i>
                  </a>
                </Tippy>
              </div>
            </div>
          </section>
        </article>
        <footer className="footer-container">
          {'© Terminal Byte - Editor -- Made with  '}
          <i className="fa fa-heart"></i>
          <span>{' by Guzmán Monné -- Get in touch'}</span>
          <a href="https://twitter.com/guzmonne"><i className="fa fa-twitter"></i></a>   
          <span>{' or contribute'}</span>
          <a href="https://github.com/guzmonne"><i className="fa fa-github"></i></a>   
        </footer>
      </React.Fragment>
    )
  }
}

/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
  return btoa(unescape(encodeURIComponent(data)));
}