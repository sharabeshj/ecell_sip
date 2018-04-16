import React,{ Component } from 'react';
import axios from 'axios';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import {Redirect} from 'react-router-dom';

export default class Apply extends Component {
	constructor(props){
		super(props);
		this.state = {
			name : '',
			email : '',
			job : '',
			sop : '',
			gdrive : ''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleSop = this.handleSop.bind(this);
		this.handleGdrive = this.handleGdrive.bind(this);
	}
	componentDidmount(){
		this.setState({job : this.props.location.state.job})
	}
	handleFormSubmit(e){
		e.preventDefault();
		const formPayLoad = {
			name : this.state.name,
			email : this.state.email,
			sop : this.state.sop,
			gdrive : this.state.gdrive,
		};
		axios.post('/api/applicants',{formPayLoad})
			.then(res => {
				this.redirect();
			})
			.catch(e => console.log(e));			
	}
	redirect(){
		return  <Redirect to = '/home'/>;
	}
	handleName(e){
		this.setState({ name : e.target.value });
	}
	handleEmail(e){
		this.setState({ email : e.target.value });
	}
	handleSop(e){
		this.setState({ sop : e.target.value });	
	}
	handleGdrive(e){
		this.setState({ gdrive : e.target.value });
	}
	render(){
		return (
			<form onSubmit = {this.handleFormSubmit}>
				<SingleInput
				inputType = {'text'}
				title = {'Name'}
				name = {'name'}
				content = {this.state.name}
				controlFunc = {this.handleName}
				placeholder = {'type your name'}/>
				<SingleInput
				inputType = {'text'}
				title = {'Email'}
				name = {'email'}
				content = {this.state.email}
				controlFunc = {this.handleEmail}
				placeholder = {'type your email'}/> 
				<SingleInput
				inputType = {'text'}
				name = {'job'}
				content = {this.state.job}
				/>
				<TextArea
				title = {'Write your SOP here'}
				rows = {20}
				resize = {false}
				content = {this.state.sop}
				controlFunc = {this.handleSop}/>
				<SingleInput
				inputType = {'text'}
				title = {'Google Drive link of resume'}
				name = {'gdrive'}
				content = {this.state.gdrive}
				controlFunc = {this.handleGdrive}
				placeholder = {'enter your link here'}/>
				<input type = "submit" value = "submit"/>
			</form>
			)
	}
}