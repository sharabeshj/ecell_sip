import React,{ Component } from 'react';
import axios from 'axios';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import {Redirect} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

const styles = theme => ({
	button : {
		margin : theme.spacing.unit,
	},
	input : {
		display : 'none',
	},
});

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			title : '',
			description : '',
			category : '',
		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleFormsubmit = this.handleFormsubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	}
	componentDidMount(){
		this.connection = new WebSocket('ws://127.0.0.1:8000/jobs/');
	}
	handleTitle(e){
		this.setState({ title : e.target.value });
	}
	handleDescription(e){
		this.setState({ description : e.target.value });
	}
	handleCategory(e){
		this.setState({ category : e.target.value });
	}
	handleFormsubmit(e){
		e.preventDefault();
		const formPayload = {
			title : this.state.title,
			description :  this.state.description,
			category : this.state.category,
		}
		axios.post('/api/jobs/',formPayload,{headers : { 'Authorization' : 'Token '+localStorage.token}})
			.then(res => {
				this.handleClear(e);
				this.connection.send(JSON.stringify(formPayload));
				this.redirect();
			})
			.catch(e => console.log(e));
	}
	redirect(){
		<Redirect to = '/' />
	}
	handleClear(e){
		e.preventDefault();
		this.setState({
			title : '',
			description : '',
			category : ''
		});
	}
	render(){
		const { classes } = this.props;
		return (
			<form onSubmit = {this.handleFormsubmit}>
				<SingleInput
				inputType = {'text'}
				title = {'Title'}
				name = {'title'}
				content = {this.state.title}
				controlFunc = {this.handleTitle}
				placeholder = {'Enter  the job title'}/>
				<TextArea
				title = {'Description'}
				rows = {20}
				resize = {false}
				content = {this.state.description}
				controlFunc = {this.handleDescription}/>
				<SingleInput
				inputType = {'text'}
				title = {'Category'}
				name = {'category'}
				content = {this.state.category}
				controlFunc = {this.handleCategory}
				placeholder = {'Enter the category'}/>
				<input className = { classes.input } type = "submit" id = "submit"/>
				<label htmlFor = "submit">
					<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
						Add
					</Button>
				</label>
				<Button variant = "raised" color = "primary" className = { classes.button } onClick = {this.handleClear}>Clear</Button>
			</form>
			)
	}
}

export default withStyles(styles)(Form);