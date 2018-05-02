import React, { Component } from 'react';
import './Styles/CSS/styles.css';
import SplashPage from './components/SplashPage'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React boiler plate</h1>
          <SplashPage/>
        </header>
        <SplashPage/>

      </div>
    );
  }
}

export default App;
