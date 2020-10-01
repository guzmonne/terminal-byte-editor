import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/dist/tippy.css'; // optional
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './plugins.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

const $root = document.getElementById('root');

ReactDOM.render(<App />, $root);
