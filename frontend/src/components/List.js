import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class List extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		this.connection = new WebSocket('ws://127.0.0.1:8000/jobs/');
		this.connection.onmessage = e =>{
			this.setState({
				data : this.state.data.concat([e.data])
			})
		};
		this.loadDataFromServer();
	}
	loadDataFromServer(){
		axios.get('/api/jobs/')
			.then(res => {
				this.setState({ data : res.data });
			})
			.catch(e => console.log(e));
	}
	render() {
		if(this.state.data){
					var jobNodes = this.state.data.map(function(job){
						return <li key = { job.id }><Link to = {`/detail/${job.id}`}>{ job.title }</Link></li>
					})
				}
		return (
				<div>
					<h2>Jobs</h2>
					<ul>
						{jobNodes}
					</ul>
				</div>
			)
	}
}