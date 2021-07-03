// Libraries
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
// Components
import App from './components/App';

// Wait all scripts to load
loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App {...window.__STATE__} />
    </BrowserRouter>,
    document.getElementById('root')
  );
});
