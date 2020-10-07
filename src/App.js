import React from 'react'
import { withRouter } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import routes from './routes'

// import Chat from './Components/Chat/Chat'

import './scss/Styles.scss'

function App(props) {
  return (
    <div className='App'>
      {props.location.pathname !== '/' ? <Nav /> : null}
      {routes}
      {/* <Chat /> */}
    </div>
  )
}

export default withRouter(App)
