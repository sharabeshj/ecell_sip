import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count : 0
		}
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
		return (
			<header>
				<h2>{this.state.count}</h2>
				<nav>
					<ul>
						<li><Link to = '/'>Home</Link></li>
						<li><Link to = '/admin/login/'>Sign in</Link></li>
					</ul>
				</nav>
			</header>
			)
	}
}