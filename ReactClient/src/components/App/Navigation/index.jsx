// Libraries
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom'
// Components
import ProtectedRoute from './ProtectedRoute'
import Layout from '../../Layout'
import LoginAndRegisterRoute from './LoginAndRegisterRoute'

// Pages
const PublicHomePage = loadable(() => import('../../../pages/Home/Public'), {
  ssr: true,
})
const LoginPage = loadable(() => import('../../../pages/Login'), { ssr: true })
const RegisterPage = loadable(() => import('../../../pages/Register'), { ssr: true })

const Navigation = () => {
  return (
    <Layout>
      <Switch>
        <LoginAndRegisterRoute path="/login" Component={LoginPage} />
        <LoginAndRegisterRoute path="/register" Component={RegisterPage} />
        <ProtectedRoute exact path="/" Component={PublicHomePage} />
      </Switch>
    </Layout>
  )
}

export default Navigation
