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


class TextArea extends Component {
	constructor(props){
		super(props);
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
		title : PropTypes.string.isRequired,
		rows : PropTypes.number.isRequired,
		content : PropTypes.string.isRequired,
		placeholder : PropTypes.string,
		controlFunc : PropTypes.func.isRequired,
	};
	render(){
		const { classes } = this.props;
		return (
			<div>
				<TextField
				label = { this.props.title }
				multiline
				rowMax = "5"
				className = { classes.textField }
				name = {this.props.name}
				rows = {this.props.rows}
				value = {this.props.content}
				onChange = {this.props.controlFunc}
				placeholder = {this.props.placeholder}
				margin = "normal"/>
			</div>
			);
	}
}

export default withStyles(styles)(TextArea);