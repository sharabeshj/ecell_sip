import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import Home from '../container/Home';
import Login from '../container/Login';
import Admin from '../container/Admin';
import Apply from '../container/Apply';
import Form from '../container/Form';

export default class Main extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<main>
				<Switch>
					<Route exact path = '/' component = { Home }/>
					<Route path = '/login' component = { Login }/>
					<Route path = '/admin' component = { Admin }/>
					<Route path = '/form' component = { Form }/>
				</Switch>
			</main>
			)
	}
}