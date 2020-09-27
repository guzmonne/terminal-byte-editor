const App = require('./app.js');

describe('App', () => {
  beforeEach(() => {
    global.window.Tweakpane = jest.fn();
  });

  test('should be defined', () => {
    expect(App).toBeDefined();
  });

  test('should not throw when called', () => {
    expect(() => { App() }).not.toThrow();
  });

  describe('ready()', () => {

    test('should be defined', () => {
      const app = App();
      expect(app.ready).toBeDefined();
    });

    test('should call the callback function', () => {
      const app = App();
      const callback = jest.fn();
      app.ready(callback);
      expect(callback).toHaveBeenCalled();
    });

  });

  describe('createTerminalByteURL()', () => {
    let app;

    beforeEach(() => {
      app = App();
    });

    test('should be defined', () => {
      expect(app.createTerminalByteURL).toBeDefined();
    });

    test('should return a string', () => {
      expect(typeof app.createTerminalByteURL()).toBe('string');
    });

    test('should use the `app.params` object by default', () => {
      const baseUrl = 'http://localhost';
      const params = {
        padding: 1,
        size: 18,
        minSize: 12,
        maxSize: 24,
      }      
      const expected = [
        baseUrl,
        `?padding=${ params.padding }`,
        `&size=${ params.size }`,
        `&minSize=${ params.minSize }`,
        `&maxSize=${ params.maxSize }`,
      ].join('');
      app.BASE_URL = baseUrl;
      app.params = params;
      const actual = app.createTerminalByteURL();
      expect(actual).toEqual(expected);
    });

    test('should use the override parameters if provided', () => {
      const baseUrl = 'http://localhost';
      const params = {
        padding: 1,
        size: 18,
        minSize: 12,
        maxSize: 24,
      }      
      const expected = [
        baseUrl,
        `?padding=${ params.padding }`,
        `&size=${ params.size }`,
        `&minSize=${ params.minSize }`,
        `&maxSize=${ params.maxSize }`,
      ].join('');
      app.BASE_URL = baseUrl;
      app.params = {};
      const actual = app.createTerminalByteURL(params);
      expect(actual).toEqual(expected);
    });

  });

  describe('setIframeURL()', () => {
    let app;

    beforeEach(() => {
      app = App();
    });

    test('should be defined', () => {
      expect(app.setIframeURL).toBeDefined();
    });

    test('should set the provided URL on the `app.$iframe` object', () => {
      const expected = 'http://localhost';
      app.$iframe = { src: '' };
      app.setIframeURL(expected);
      expect(app.$iframe.src).toEqual(expected);
    });

    test('should set the result of the `createTerminalByteURL` function on the `app.$iframe` object', () => {
      const expected = 'http://localhost';
      app.$iframe = { src: '' };
      app.createTerminalByteURL = jest.fn(() => expected);
      app.setIframeURL();
      expect(app.$iframe.src).toEqual(expected);
    });

  });

  describe('createCommandDiv()', () => {
    let app;

    beforeEach(() => {
      app = App();
    });

    test('should be defined', () => {
      expect(app.createCommandDiv).toBeDefined();
    });

    test('should return an HTML element', () => {
      const actual = app.createCommandDiv();
      expect(isElement(actual)).toBe(true);
    });

    test('should return the correct HTML output given the index', () => {
      const expected = `<div class="tp-rotv_c" style="height: auto;">
  <div class="tp-v tp-lblv tp-v-first">
    <div class="tp-lblv_l"><span class="tag">#10</span>Command</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text"></textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-lblv">
    <div class="tp-lblv_l"><span class="tag">#10</span>Output</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text"></textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-btnv tp-v-last">
    <button class="tp-btnv_b remove">
      Remove command
    </button>
  </div>
</div>`;
      const actual = app.createCommandDiv(10);
      expect(actual.outerHTML).toBe(expected);
    });

    test('should return the correct HTML output given the `isLast` flag', () => {
      const expected = `<div class="tp-rotv_c" style="height: auto;">
  <div class="tp-v tp-lblv tp-v-first">
    <div class="tp-lblv_l"><span class="tag">#10</span>Command</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text"></textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-lblv">
    <div class="tp-lblv_l"><span class="tag">#10</span>Output</div>
    <div class="tp-lblv_v">
      <div class="tp-v tp-txtiv tp-v-first">
        <textarea class="tp-txtiv_i" type="text"></textarea>
      </div>
    </div>
  </div>
  <div class="tp-v tp-btnv tp-v-last">
    <button class="tp-btnv_b add">
      Add command
    </button>
  </div>
</div>`;
      const actual = app.createCommandDiv(10, true);
      expect(actual.outerHTML).toBe(expected);
    });
  });

  describe('createElementFromHTML()', () => {
    let app;

    beforeEach(() => {
      app = App();
    });

    test('should be defined', () => {
      expect(app.createElementFromHTML).toBeDefined();
    });

    test('should return an HTML element', () => {
      expect(isElement(app.createElementFromHTML('<div></div>'))).toBe(true);
    });

    test('should include all the elements defined on the string', () => {
      const expected = `<button id="test">Test</button>`;
      const htmlString = `<div>${ expected }</div>`;
      const actual = app.createElementFromHTML(htmlString);
      expect(actual.innerHTML).toBe(expected);
    });
  });

});

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;  
}