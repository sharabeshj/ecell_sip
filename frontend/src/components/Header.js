import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<header>
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