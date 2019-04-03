import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from '.././Map/Map';
import InfoWindow from '.././InfoWindow/InfoWindow';
import { mapStyles } from '../../utils'

class MapContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
          data:this.props.markerData,
          activeMarker:'',
      }
      this.mapOptions = {
        center:{lat:32.7547,lng:-97.3614},
        zoom: 8,
        styles: mapStyles()
      }
    }


    render() {
        return(
              <Map id="myMap" options={this.mapOptions} data = {this.state.data} clearMarkers = {this.clearMarkers} />
        );
    }
}

export default MapContainer


//let marker = new window.google.maps.Marker({
//  position: { lat: 41.0082, lng: 28.9784 },
  //map: map,
  //title: 'Hello Istanbul!'
//});
