// Libraries
import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'
// Components
import App from '../../src/components/App'

export default (req, res, next) => {
  // Get html template
  const indexFile = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(indexFile, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Not Found', err)
      return res.status(404).end()
    }

    // Get all static files
    const statsFile = path.resolve(__dirname, 'loadable-stats.json')

    // Used to collect chunks server-side and get them as script tags or script elements.
    const extractor = new ChunkExtractor({ statsFile })

    // Prepared new html
    const html = renderToString(
      extractor.collectChunks(
        <StaticRouter location={req.originalUrl}>
          <App />
        </StaticRouter>
      )
    )

    const htmlWithState = htmlData.replace(
      'window.__STATE__={}',
      `window.__STATE__=${JSON.stringify({
        user: req.user,
        posts: req.posts,
      })}`
    )

    const htmlWithData = htmlWithState.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    return res.send(htmlWithData)
  })
}
