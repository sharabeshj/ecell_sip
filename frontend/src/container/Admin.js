import React,{ Component } from 'react';
import Form from './Form.js'

export default class Admin extends Component {
	constructor(props){
		super(props);
		this.state = {
			token : ''
		}
	}
	componentDidMount(){
		this.setState({token : this.props.token});
	}
	render(){
		return (
			<div>
				<Form token = {this.state.token}/>
				</div>
			)
	}
}