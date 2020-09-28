import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import Register from './Components/Register/Register'


export default (
    <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        {/* <Route path='/Dashboard' component={Dashboard} /> */}
    </Switch>
)