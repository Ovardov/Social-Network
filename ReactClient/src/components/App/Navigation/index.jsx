// Libraries
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom'
// Components
import ProtectedRoute from './ProtectedRoute'
import Layout from '../../Layout'

// Pages
const PublicHomePage = loadable(() => import('../../../pages/Home/Public'), {
  ssr: true,
})
const LoginPage = loadable(() => import('../../../pages/Login'), { ssr: true })

const Navigation = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={LoginPage} />
        {/* <Route exact path="/" component={PublicHomePage} /> */}
        <ProtectedRoute exact path="/" Component={PublicHomePage} />
      </Switch>
    </Layout>
  )
}

export default Navigation
