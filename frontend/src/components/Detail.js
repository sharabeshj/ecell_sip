import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
	root : theme.mixins.gutters({
		textAlign : 'center',
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit * 3,
	}),
	button : {
		margin : theme.spacing.unit,
	}
});

class Detail extends Component {
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
		var url = '/api/jobs/'+parseInt(this.props.match.params.pk,10)+'/';
		axios.get(url)
		.then(res => {
			this.setState({ data : res.data });
		})
		.catch(e => console.log(e));
	}
	render(){
		const { classes } = this.props;
		if(this.state.data){
			var jobDetail = this.state.data;
		}
		return (
			<Grid container justify = "center" >
			<Grid item xs={6} >
			<Paper className = { classes.root } elevation = { 4 }>
				<Typography variant = "headline" component = "h2" >
				{jobDetail.title}
				</Typography>
				<Typography component = "h3">
				Description : {jobDetail.description}
				</Typography>
				<Button variant = "raised" color = "primary" className = { classes.button } component = { Link } to = {{ pathname : '/apply',state : { job : jobDetail.title }}}>
					Accept
				</Button>
				<Button variant = "raised" color = "primary" className = { classes.button } component = { Link } to = '/'>
					Back
				</Button>
			</Paper>
			</Grid>
			</Grid>
			)
	}
}

export default withStyles(styles)(Detail);