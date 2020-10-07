import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'

import Schedule from './Components/Schedule/Schedule'
import managerScheduleCreator from './Components/Schedule/managerScheduleCreator'

import Chat from './Components/Chat/Chat'


export default (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />

        <Route path='/schedule' exact component={Schedule} />
        <Route path='/schedule/editor' component={managerScheduleCreator} />

        <Route path='/chat' component={Chat} />

    </Switch>
)