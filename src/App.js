import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer/MapContainer';
import markerData from './db.js';

class App extends Component {
    state = {
        markerData:markerData()
    }
  render() {
    return (
      <div className="App">
        
          <MapContainer markerData = {this.state.markerData} />
      </div>
    );
  }
}

export default App;
