import React,{ Component } from 'react';
import axios from 'axios';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import {Redirect} from 'react-router-dom';


export default class Form extends Component {
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
				<button onClick = {this.handleClear}>Clear</button>
			</form>
			)
	}
}