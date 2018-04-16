import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import List from '../components/List';
import Detail from '../components/Detail';
import Apply from './Apply';

export default class Home extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Switch>
				<Route exact path = '/home' component = { List }/>
				<Route path = '/detail/:pk' component = { Detail }/>
				<Route path = '/apply' component = { Apply }/>
			</Switch>
			)
	}
}