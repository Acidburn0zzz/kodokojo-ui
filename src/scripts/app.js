/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import 'babel-polyfill'

// React Redux stack
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// UI stack
import injectTapEventPlugin from 'react-tap-event-plugin'

// i18n
// shim intl if not supported by browser
import { shimIntl } from './i18n/shimIntl'
import IntlProviderContainer from './commons/IntlProviderContainer'
import { addLocaleData } from 'react-intl'
import en from '../../node_modules/react-intl/locale-data/en'
import fr from '../../node_modules/react-intl/locale-data/fr'

addLocaleData(en)
addLocaleData(fr)

// Application
import configureStore from './store/configureStore'
import App from './components/app/App.component.js'
import SignupPage from './pages/Signup.page.js'
import LoginPage from './pages/Login.page.js'
import FirstProjectPage from './pages/FirstProject.page.js'
import StacksPage from './pages/Stacks.page.js'
import MembersPage from './pages/Members.page.js'
import UsersPage from './pages/Users.page'
import NotFoundPage from './pages/NotFound.page'

import authService from './services/auth.service.js'
import { handleHistoryChange } from './services/history.service.js'

// Add the reducer to your store on the `routing` key
const store = configureStore({})

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => store.dispatch(handleHistoryChange(location.pathname)))

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const initApp = () => {
  ReactDOM.render(
    <IntlProviderContainer store={store}>
      <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
          <Route
            component={App}
            path="/"
          >
            <IndexRoute
              component={SignupPage}
            />
            <Route
              component={LoginPage}
              path="login"
            />
            <Route
              component={FirstProjectPage}
              onEnter={authService.checkAuth}
              path="firstProject"
            />
            <Route
              component={StacksPage}
              onEnter={authService.checkAuth}
              path="stacks"
            />
            <Route
              component={MembersPage}
              onEnter={authService.checkAuth}
              path="members"
            />
            <Route
              component={UsersPage}
              onEnter={authService.checkAuth}
              path="users"
            />
            <Route
              component={NotFoundPage}
              contentFromRoute="--"
              path="*"
              status={404}
            />
          </Route>
        </Router>
      </Provider>
    </IntlProviderContainer>,
    document.getElementById('app')
  )
}

// FIXME
// shim intl is necessary for safari (v9.1.1), remove later ?
shimIntl(initApp)
