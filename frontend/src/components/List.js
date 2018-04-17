import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList,{ GridListTile,GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
	root : {
		display : 'flex',
		flexWrap : 'wrap',
		justifyContent : 'space-around',
		overflow : 'hidden',
		backgroundColor : theme.palette.background.paper,
	},
	gridList : {
		width : 1000,
		height : 1000,
	},
	icon : {
		color : 'rgba(255,255,255,0.54)',
	},
});


class List extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	};
	componentDidMount(){
		this.connection = new WebSocket('ws://127.0.0.1:8000/jobs/');
		this.connection.onmessage = e =>{
			var data = JSON.parse(e.data)
			this.setState({
				data : this.state.data.concat([data])
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
		const { classes } = this.props;
		if(this.state.data){
					var jobNodes = this.state.data.map(function(job){
						return <GridListTile key = { job.id }><img src = {job.img} alt = {job.title}/><GridListTileBar
						title = { job.title}
						actionIcon = {
							<Link to = {`/detail/${job.id}`}><IconButton className = { classes.icon }>
								<InfoIcon/>
							</IconButton></Link>
						}/>
						
						</GridListTile>
					})
				}
		return (
				<div className = { classes.root }>
					<GridList cellHeight = {180} className = { classes.gridList }>
						<GridListTile key = "Subheader" cols = {2} style = {{ height : 'auto' }}>
							<Subheader component = "div">Jobs</Subheader>
						</GridListTile>
						{jobNodes}
					</GridList>
				</div>
			)
	}
}

export default withStyles(styles)(List);