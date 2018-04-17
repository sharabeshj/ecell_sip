import React,{ Component } from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import axios from 'axios';
var auth = require('./auth');



export default class Admin extends Component {
	constructor(props){
		super(props);
		this.state = {
			user : []
		};
		this.logoutHandler = this.logoutHandler.bind(this);
	}
	componentDidMount(){
		this.loadUserData();
	}
	static contextTypes = {
		router : PropTypes.object.isRequired
	};
	logoutHandler(){
		auth.logout();
		this.context.router.history.replace('/admin/login/');
	}
	loadUserData(){
		axios.get('/users/i/',{  headers : { 'Authorization' : 'Token '+localStorage.token}})
			.then(res => {
				this.setState({user : res.data});
			})
			.catch(e => console.log(e));
	}
	render(){
		return (
			<div>
				<h3>you are now logged in,{this.state.user.username}</h3>
				<button onClick = {this.logoutHandler}>Log out</button>
				<Form/>
				</div>
			)
	}
}