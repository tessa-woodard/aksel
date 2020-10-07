import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './ducks/store'
import App from './App'

import { HashRouter, BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'))

serviceWorker.unregister()
