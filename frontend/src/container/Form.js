import React,{ Component } from 'react';
import axios from 'axios';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';

export default class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			title : '',
			description : '',
			category : '',
		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleDescription = this.description.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleFormsubmit = this.handleFormsubmit.bind(this);
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
		const formPayload = {
			title : this.state.title,
			description :  this.state.description,
			category : this.state.category,
		}
		var token = 'Token '+this.props.token; 
		axios.post('/api/jobs/',{headers : { 'Content-type' : 'application/json','Authentication' : token},formPayload})
			.then(res => {
				this.redirect();
			})
			.catch(e => console.log(e));
	}
	render(){
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
				<input type = "submit" value = "Add" />
			</form>
			)
	}
}