import React,{ Component } from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends Component {
	constructor(props){
		super(props);
	}
	static propTypes = {
		title : PropTypes.string.isRequired,
		rows : PropTypes.number.isRequired,
		content : PropTypes.string.isRequired,
		resize : PropTypes.bool,
		placeholder : PropTypes.string,
		controlFunc : PropTypes.func.isRequired,
	};
	render(){
		return (
			<div>
				<label>{this.props.title}</label>
				<textarea 
				style = {this.props.rersize ? null : {resize : 'none'}}
				name = {this.props.name}
				rows = {this.props.rows}
				value = {this.props.content}
				onChange = {this.props.controlFunc}
				placeholder = {this.props.placeholder}/>
			</div>
			);
	}
}