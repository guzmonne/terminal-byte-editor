import App from './app.js';

const app = window.app = new App();

app.ready(() => {
  app.pane.addInput(app.params, 'size', { step: 1, });
  app.pane.addInput(app.params, 'minSize', { step: 1 });
  app.pane.addInput(app.params, 'maxSize', { step: 1 });
  app.pane.addInput(app.params, 'padding', { min: 0, max: 10, step: 0.5 });
  app.pane.addInput(app.params, 'gradient', { options: app.GRADIENTS });
  app.pane.addInput(app.params, 'gradientRot', { min: 0, max: 360, step: 1 });
  app.pane.addInput(app.params, 'fit');
  app.pane.addInput(app.params, 'highlight');
  app.pane.addInput(app.params, 'prompt');
  app.pane.addSeparator();
  app.pane.addButton({ title: 'Update' }).on('click', () => app.setIframeURL());

  app.setIframeURL();
});