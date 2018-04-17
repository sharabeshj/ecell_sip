import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
	root : {
		flexGrow : 1,
	},
	flex : {
		flex : 1,
	},
	menuButton : {
		marginLeft : -12,
		marginRight : 20,
	},
};

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count : 0
		}
	}
	static PropTypes = {
		classes : PropTypes.object.isRequired,
	}
	componentDidMount(){
		axios.get('api/applicants/')
			.then( res => {
				this.setState({
					count : Object.keys(res.data).length
				})
			})
		this.connection = new WebSocket('ws://127.0.0.1:8000/applicants/');
		this.connection.onmessage = e => {
			this.setState({
				count : this.state.count+1
			});
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<header className = { classes.root }>
			<AppBar position = "static">
				<Toolbar>
					<Typography variant = "title" colour = "inherit" className = { classes.flex }>
						SIP Registrations-{this.state.count}
					</Typography>
					<Link to = '/'><Button color = "inherit">Home</Button></Link>
					<Link to = '/admin/login/'><Button color = "inherit">Sign in</Button></Link>
				</Toolbar>
			</AppBar>
			</header>
			)
	}
}

export default withStyles(styles)(Header);