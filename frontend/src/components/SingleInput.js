import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
	container : {
		display : 'flex',
		flexWrap : 'wrap',
	},
	textField : {
		marginLeft : theme.spacing.unit,
		marginRight : theme.spacing.unit,
		width : 300,
	},
});

class SingleInput extends Component{
	constructor(props){
		super(props);
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
		inputType : PropTypes.oneOf(['text','number','password']).isRequired,
		title : PropTypes.string.isRequired,
		name : PropTypes.string.isRequired,
		controlFunc : PropTypes.func,
		content : PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number]).isRequired,
		placeholder : PropTypes.string,
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<TextField 
				label = {this.props.title}
				name = {this.props.name}
				className = { classes.textField }
				type = {this.props.inputType}
				value = {this.props.content}
				onChange ={this.props.controlFunc}
				placeholder = {this.props.placeholder}
				margin = "normal"/>
			</div>
			);
	}
}

export default withStyles(styles)(SingleInput);