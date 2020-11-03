import React, { Component } from 'react';
import './App.css';
import Routes from './routes';

class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "DCR",
      home: false
    }
  }

  render(){
    return (
      <div>
        <Routes name={this.appName} />
      </div>
    );
  }
}


export default App;
