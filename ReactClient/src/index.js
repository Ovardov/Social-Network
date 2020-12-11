import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './components/App/index'

// Wait all scripts to load
loadableReady(() => {
  hydrate(<App />, document.getElementById('root'))
})