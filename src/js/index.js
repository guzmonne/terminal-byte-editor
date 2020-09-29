import 'simplebar';
import 'simplebar/dist/simplebar.css';
import './plugins.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

const $root = document.getElementById('root');

ReactDOM.render(<App />, $root);
