import React, { Component } from 'react';
import './App.css';
//import MapContainer from './components/MapContainer/MapContainer';
import markerData from './db.js';
import Map from './components/Map/Map';
import Listing from './components/Listing/Listing';
import { mapStyles } from './utils';

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            markerData:markerData(),
            showCurrentListing:false,
            currentListingData:null
        }
        this.getListingData = this.getListingData.bind(this);
        this.closeListing = this.closeListing.bind(this);
    }

    closeListing(){
        this.setState({
            showCurrentListing:false
        })
        console.log('listing is closed')
    }

    getListingData(marker){
        let listingData = this.state.markerData.filter((data)=>{
            return data.id === marker.id
        })
        this.setState({
            currentListingData:listingData[0],
            showCurrentListing:true
        })
    }

    render() {

      const mapOptions = {
        center:{lat:32.7547,lng:-97.3614},
        zoom: 8,
        styles: mapStyles()
      }

      return (
        <div className="App">
            {this.state.showCurrentListing
              ? <Listing listingData = {this.state.currentListingData} handleClose = {this.closeListing}/>
              : null
            }
            <Map id="myMap" options={mapOptions} data = {this.state.markerData} getListing = {this.getListingData}/>
        </div>
      );
    }
}

export default App;
