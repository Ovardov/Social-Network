// Libraries
import React from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom'
// Components
import Layout from '../../Layout'

const PublicHomePage = loadable(() => import('../../../pages/Home/Public'), { ssr: true })

const Navigation = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={PublicHomePage} />
      </Switch>
    </Layout>
  )
}

export default Navigation
