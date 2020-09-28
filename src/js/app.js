exports = module.exports = App;


/**
 * @class
 * Main application global object.
 */
function App() {
  const self = {
    BASE_URL: 'http://127.0.0.1:1235',
    GRADIENTS: {
      random: 'random',
      vitalOcean: 'vitalOcean',
      kaleSalad: 'kaleSalad',
      discoClub: 'discoClub',
      shadyLane: 'shadyLane',
      retroWagon: 'retroWagon',
      frescoCrush: 'frescoCrush',
      cucumberWater: 'cucumberWater',
      seaSalt: 'seaSalt',
      parFour: 'parFour',
      ooeyGooey: 'ooeyGooey',
      bloodyMimosa: 'bloodyMimosa',
      lovelyLilly: 'lovelyLilly',
      aquaSpray: 'aquaSpray',
      melloYellow: 'melloYellow',
      dustyCactus: 'dustyCactus',
    },
    params: {
      minSize:     12,
      size:        18,
      maxSize:     24,
      padding:     5,
      commands:    [],
      outputs:     [],
      gradient:    'random',
      gradientRot: 0,
      highlight:   false,
      fit:         false,
      prompt:      false,
    },
    $commands: document.getElementById('commands'),
    $tweakpane: document.getElementById('tweakpane'),
    $iframe: document.getElementById('terminal-byte'),
    ready,
    setIframeURL,
    setCommands,
    createTerminalByteURL,
    createCommandDiv,
    createElementFromHTML,
    onTextareaChange,
    onCommandButtonClick,
  };

  self.pane = new Tweakpane({ 
    title: 'Configuration',
    container: self.$tweakpane,
  });

  return self;
  // Functions
  /**
   * Application entry function. Runs the app when the DOM is ready.
   * @param {function} fn - Function to run when the DOM is ready.
   * 
   * @example
   *
   * ```js
   * const app = App();
   * 
   * app.ready(function() {
   *   console.log('DOM is ready');
   *   // 'DOM is ready';
   * });
   * ```
   */
  function ready(callback) {
    try {
      if (document.readyState != 'loading') callback(); 
      else document.addEventListener('DOMContentLoaded', callback);
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Creates the URL poiting to Terminal Byte
   * @param {Object} [overrides] - Overrides for the `params` objsect values.
   * @param {number} overrides.padding - Window padding.
   * @return {string}
   * 
   * @example
   *
   * ```js
   * const url = app.createTerminalByteURL();
   * console.log(url);
   * // '//localhost:1235?padding=1'
   * ```
   */
  function createTerminalByteURL(overrides={}) {
    const { padding, size, minSize, maxSize } = { ...self.params, ...overrides }
    return self.BASE_URL + 
      `?padding=${ padding }` +
      `&size=${ size }` +
      `&minSize=${ minSize }` +
      `&maxSize=${ maxSize }`;
  }
  /**
   * Sets the Iframe URL. It will try to construct the URL from
   * the `app.params` object unless an override `url` is defined.
   * @param {string} [url] - Overide URl.
   */
  function setIframeURL(url) {
    url || (url = self.createTerminalByteURL());
    self.$iframe.src = url;
  }

  function onTextareaChange(event) {
    console.log(event);
  }

  function onCommandButtonClick(event) {
    console.log(event);
  }
  /**
   * Sets up the `commands` HTML elements and its event handlers.
   * 
   * @example
   *
   * ```js
   * app.setCommands();
   * ```
   */
  function setCommands() {
    self.$commands.querySelectorAll('.tp-btnv_b')
      .forEach(button => button.removeEventListener('click', self.onCommandButtonClick));
    self.$commands.querySelectorAll('textarea')
      .forEach(textarea => textarea.removeEventListener('change', self.onTextareaChange));
    self.$commands.innerHTML = '';
    self.params.commands.forEach((command, index) => {
      self.$commands.appendChild(self.createCommandDiv({ command, index }));
    });
  }
  /**
   * Creates an HTML element `div` from a string.
   * @param {string} htmlString - Source HTML string.
   * @return {HTMLElement}
   * 
   * @example
   *
   * ```js
   * const div = app.createElement('<div id="example"></div>');
   * document.body.appendChild(div);
   * // No error is thrown.
   * ```
   */
  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  }
  /**
   * Template for the `command` input.
   * @param {Object} props - Template props.
   * @param {number} props.index - Command index number.
   * @param {string} props.command - Command textarea value.
   * @param {string} props.output - Command output textarea value.
   * @param {boolean} props.isLast - Flag that indicates if the command is the last.
   * 
   * @example
   *
   * ```js
   * const commandDiv = app.createCommandDiv(1, true);
   * document.body.innerHTML = commandDiv;
   * ```
   */
  function createCommandDiv(props={}) {
    const {index=0, command="", output="", isLast=false} = props;
    const template = `
<div class="tp-rotv_c" style="height: auto;">
  <div class="tp-v tp-lblv tp-v-first">
    <div class="tp-lblv_l"><span class="tag">${ '#' + index }</span>Command</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text" data-command data-index="${ index }">${ command }</textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-lblv">
    <div class="tp-lblv_l"><span class="tag">${ '#' + index }</span>Output</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text" data-output data-index="${ index }">${ output }</textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-btnv tp-v-last">
    <button class="tp-btnv_b ${ isLast ? 'add' : 'remove'}">
      ${ isLast ? 'Add' : 'Remove' } command
    </button>
  </div>
</div>`
    const element = self.createElementFromHTML(template);
    element.querySelector('[data-command]').addEventListener('change', self.onTextareaChange);
    element.querySelector('[data-output]').addEventListener('change', self.onTextareaChange);
    element.querySelector('button').addEventListener('click', self.onCommandButtonClick);
    return element;
  }
}