import React,{ Component } from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

var auth = require('./auth');

const styles = theme => ({
	button : {
		margin : theme.spacing.unit,
	},
});


class Admin extends Component {
	constructor(props){
		super(props);
		this.state = {
			user : []
		};
		this.logoutHandler = this.logoutHandler.bind(this);
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	};
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
		const { classes } = this.props;
		return (
			<div>
				<h3>you are now logged in,{this.state.user.username}</h3>
				<Button variant = "raised" color = "primary" className = { classes.button } onClick = {this.logoutHandler}>Logout</Button>
				<Form/>
				</div>
			)
	}
}

export default withStyles(styles)(Admin);