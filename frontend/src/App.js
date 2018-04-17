import React, { Component } from 'react';
import Header from './components/Header'
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
	constructor(){
		super();
	}
  render() {
    return (
    	<MuiThemeProvider>
      <Header />
      <Main/>
      </MuiThemeProvider>
    );
  }
}

export default App;
