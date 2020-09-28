import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from './Components/Auth/Auth'
// import Dashboard from './Components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route path='/' exact component={Auth} />
        {/* <Route path='/Dashboard' component={Dashboard} /> */}
    </Switch>
)