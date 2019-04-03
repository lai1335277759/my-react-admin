import React,{ Component } from 'react'
import {Route,Switch} from 'react-router-dom'

import Login from './routePages/login'
import Admin from './routePages/admin'

import './assets/less/reset.less'
export default class App extends Component{
  render () {
    return (

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Admin} />
      </Switch>

    )
  }
}