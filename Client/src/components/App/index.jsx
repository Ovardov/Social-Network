import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from '../Layout'

const PublicHomePage = lazy(() => import('../../pages/Home/Public'))

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={PublicHomePage} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
