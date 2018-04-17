import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import List from './List';
import Login from '../container/Login';
import Admin from '../container/Admin';
import Detail from './Detail'
import Apply from '../container/Apply'

var auth = require('../container/auth');

export default class Main extends Component {
	constructor(props){
		super(props);
	}
	requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/admin/login/',
            state: {nextPathname: '/admin/'}
        })
    }
	}
	render() {
		return (
			<main>
				<Switch>
					<Route exact path = '/' component = { List }/>
					<Route path='/admin/login/' component={Login} />
        			<Route path='/admin/' component={Admin} onEnter={this.requireAuth}/>
					<Route path = '/detail/:pk' component = { Detail }/>
					<Route path = '/apply' component = { Apply }/> />
				</Switch>
			</main>
			)
	}
}