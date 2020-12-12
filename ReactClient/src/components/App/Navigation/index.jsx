// Libraries
import React from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom'
// Components
import Layout from '../../Layout'

// Pages
const PublicHomePage = loadable(() => import('../../../pages/Home/Public'), { ssr: true })
const LoginPage = loadable(() => import('../../../pages/Login'), { ssr: true })

const Navigation = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={PublicHomePage} />
      </Switch>
    </Layout>
  )
}

export default Navigation
