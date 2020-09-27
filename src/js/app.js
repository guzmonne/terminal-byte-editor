exports = module.exports = App;

const BASE_URL = 'http://127.0.0.1:1235';
/**
 * @class
 * Main application global object.
 */
function App() {
  const self = {
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
    ready,
    createTerminalByteURL,
    setIframeURL,
  };

  self.$tweakpane = document.getElementById('tweakpane');
  self.$iframe = document.getElementById('terminal-byte');
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
    const { padding, size, minSize, maxSize } = { ...self.params, overrides }
    return BASE_URL + 
      `/?padding=${ padding }` +
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

  function createCommandDiv(index) {
    const isLast = index === self.params.commands.length;

    return `
      <div class="tp-rotv_c" style="height: auto;">
        <div class="tp-v tp-lblv tp-v-first">
          <div class="tp-lblv_l"><span class="tag">${ '#' + index }</span>Command</div>
          <div class="tp-lblv_v">
            <div class="tp-v tp-txtiv tp-v-first">
              <textarea class="tp-txtiv_i" type="text"></textarea>
            </div>
          </div>
        </div>
        <div class="tp-v tp-lblv">
          <div class="tp-lblv_l"><span class="tag">${ '#' + index }</span>Output</div>
          <div class="tp-lblv_v">
            <div class="tp-v tp-txtiv tp-v-first">
              <textarea class="tp-txtiv_i" type="text"></textarea>
            </div>
          </div>
        </div>
        <div class="tp-v tp-btnv tp-v-last">
          <button class="tp-btnv_b ${ isLast ? 'add' : 'remove'}">
            ${ isLast ? 'Add' : 'Remove' } command
          </button>
        </div>
      </div>
    `;
  }
}