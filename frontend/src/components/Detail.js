import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Detail extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		this.loadDetail();
	}
	loadDetail(){
		var url = '/api/jobs/'+parseInt(this.props.params.pk,10)+'/';
		axios.get(url)
		.then(res => {
			this.setState({ data : res.data });
		})
		.catch(e => console.log(e));
	}
	render(){
		if(this.state.data){
			var jobDetail = this.state.data;
		}
		return (
			<div>
				<h2>{jobDetail.title}</h2>
				<h3>Description : {jobDetail.description}</h3>
				<Link to = {{ pathname : '/apply',state : { job : jobDetail.title }}}>Accept</Link>
				<Link to = '/home'>Back</Link>
			</div>
			)
	}
}