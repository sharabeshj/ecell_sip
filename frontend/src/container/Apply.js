import React,{ Component } from 'react';
import axios from 'axios';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import {Redirect} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
	root : {
		textAlign : 'center',
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit * 3,
	},
	button : {
		margin : theme.spacing.unit,
	},
	input : {
		display : 'none',
	},
});

class Apply extends Component {
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
		this.handleClear = this.handleClear.bind(this);
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	}
	componentDidMount(){
		this.setState({job : this.props.location.state.job});
		this.connection = new WebSocket('ws://127.0.0.1:8000/applicants/');
	}
	handleFormSubmit(e){
		e.preventDefault();
		const formPayLoad = {
			name : this.state.name,
			email : this.state.email,
			sop : this.state.sop,
			job : this.state.job,
			gdrive : this.state.gdrive,
		};
		axios.post('/api/applicants',formPayLoad)
			.then(res => {
				this.handleClear(e);
				this.connection.send(JSON.stringify({
					activity_type : 'apply'
				}));
				this.redirect();
			})
			.catch(e => console.log(e));			
	}
	redirect(){
		return  <Redirect to = '/'/>;
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
	handleClear(e){
		e.preventDefault();
		this.setState({
			name : '',
			email : '',
			sop :  '',
			gdrive : ''
		});
	}
	render(){
		const { classes } = this.props;
		return (
			<Grid container justify = "center">
			<Grid item xs = {6} >
			<Paper className = { classes.root } elevation = { 4 }>
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
				title = {'Job'}
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
				<input className = { classes.input } type = "submit" id = "submit"/>
				<label htmlFor = "submit">
					<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
						Submit
					</Button>
				</label>
				<Button variant = "raised" color = "primary" className = { classes.button } onClick = {this.handleClear}>Clear</Button>
			</form>
			</Paper>
			</Grid>
			</Grid>
			)
	}
}

export default withStyles(styles)(Apply);