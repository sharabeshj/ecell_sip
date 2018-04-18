import React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SingleInput from '../components/SingleInput';
import Admin from './Admin'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

var auth = require('./auth');
const styles = theme => ({
	root : {
		textAlign : 'center',
	},
	button : {
		margin : theme.spacing.unit,
	},
	input : {
		display : 'none',
	},
});

class Login extends Component {
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
	static contextTypes = {
		router : PropTypes.object.isRequired
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	}
	handleUsername(e){
		this.setState({ username : e.target.value });
	}
	handlePassword(e){
		this.setState({ password : e.target.value });
	}
	handleFormSubmit(e){
		e.preventDefault();
		var username = this.state.username;
		var password = this.state.password;
		auth.login(username,password,(loggedIn) => {
			if(loggedIn){
				this.context.router.history.replace('/admin/');
			}
		});
	}
	render(){
		const { classes } = this.props;
		return (
			<Grid container justify = "center">
			<Grid item xs = {6} className = { classes.root }>
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
				<input className = { classes.input } type = "submit" id = "submit"/>
				<label htmlFor = "submit">
					<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
						Login
					</Button>
				</label>
			</form>
			</Grid>
			</Grid>
			)
	}
}

export default withStyles(styles)(Login);