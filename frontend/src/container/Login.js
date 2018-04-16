import React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SingleInput from '../components/SingleInput';
import Admin from './Admin'
import ReactDOM from 'react-dom';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			password : ''
		};
		this.handleUsername =  this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	handleUsername(e){
		this.setState({ username : e.target.value });
	}
	handlePassword(e){
		this.setState({ password : e.target.value });
	}
	handleFormSubmit(e){
		const formPayLoad = {
			username : this.state.username,
			password : this.state.password
		}
		axios.post('/api/login/',{formPayLoad})
			.then(res => {
				ReactDOM.render(<Admin token = {res.token}/>,document.getElementById('root'));
			})
			.catch(e => console.log(e));
	}
	render(){
		return (
			<form onSubmit = {this.handleFormSubmit}>
				<SingleInput
				inputType = {'text'}
				title = {'Username'}
				name = {'username'}
				content = {this.state.username}
				controlFunc = {this.handleUsername}
				placeholder = {'Enter your userrname'}/>
				<SingleInput
				inputType = {'password'}
				title = {'Password'}
				name = {'password'}
				content = {this.state.password}
				controlFunc = {this.handlePassword}
				placeholder = {'Password'}/>
				<input type= "submit" value = "login"/>
			</form>
			)
	}
}