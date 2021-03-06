import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },{
      path: '/summary',
      models: () => [import('./models/summaryView')],
      component: () => import('./routes/summary-view/'),
    },{
      path: '/summary-view',
      models: () => [import('./models/summaryView')],
      component: () => import('./routes/summary-view/'),
    }, {
      path: '/video-settings',
      models: () => [import('./models/configuration')],
      component: () => import('./routes/configuration/'),
    },{
      path: '/global-settings',
      models: () => [import('./models/globalsettings')],
      component: () => import('./routes/globalsettings/'),
    },{
      path: '/wechat-public-settings',
      models: () => [import('./models/wechatpublic')],
      component: () => import('./routes/wechatpublic'),
    },{
      path: '/interface-settings',
      models: () => [import('./models/interfaceSettings')],
      component: () => import('./routes/interfaceSettings'),
    },{
      path: '/title-generator',
      models: () => [import('./models/titleGenerator')],
      component: () => import('./routes/titleGenerator'),
    },{
      path: '/guide-settings',
      models: () => [import('./models/guideSettings')],
      component: () => import('./routes/guideSettings'),
    }
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
