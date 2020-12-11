import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'

import Navigation from '../../src/components/App/Navigation'

export default (req, res, next) => {
  // Get all static files
  const statsFile = path.resolve('server-build/loadable-stats.json')

  // Used to collect chunks server-side and get them as script tags or script elements.
  const extractor = new ChunkExtractor({ statsFile })

  // Prepared new html
  const html = renderToString(extractor.collectChunks(<StaticRouter><Navigation /></StaticRouter>));

  // Get html template
  const indexFile = path.resolve('build/index.html')

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Something went wrong!');
    }

    // Set html SSR
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
}