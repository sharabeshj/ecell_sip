import React,{ Component } from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

var auth = require('./auth');

const styles = theme => ({
	root : {
		textAlign : 'center',
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit * 3,
	},
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
			<Grid container justify = "center">
			<Grid item xs ={6} >
			<Paper className = { classes.root } elevation = { 4 }>
				<Typography variant = "title" gutterBottom>
				you are now logged in,{this.state.user.username}
				</Typography>
				<Button variant = "raised" color = "primary" className = { classes.button } onClick = {this.logoutHandler}>Logout</Button>
				<Form/>
				</Paper>
				</Grid>
				</Grid>
			)
	}
}

export default withStyles(styles)(Admin);