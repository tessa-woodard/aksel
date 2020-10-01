import React from 'react'
import { withRouter } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import routes from './routes'

import './scss/Styles.scss'

function App(props) {
  return (
    <div className='App'>
      {props.location.pathname !== '/' & '/register' ? <Nav /> : null}
      {routes}
    </div>
  )
}

export default withRouter(App)
