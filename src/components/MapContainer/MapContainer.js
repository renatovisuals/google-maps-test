import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from '.././Map/Map';
import InfoWindow from '.././InfoWindow/InfoWindow'

class MapContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
          markers:[],
          activeMarker:''
      }
      this.mapOptions = {
        center:{lat:32.7547,lng:-97.3614},
        zoom: 8
      }
    }

    createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow"> hello </div>',
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
        render(<InfoWindow marker = {this.state.activeMarker}/>, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

    onMapLoad = map => {
        const svg  = '<svg height="100" width="100"> <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /> </svg>'

        this.props.markerData.forEach(house => {
            let marker = new window.google.maps.Marker({
                map:map,
                position:house.position,
                name:house.name,
                id:house.id,
                icon:{
                    url:'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
                    scaledSize: new window.google.maps.Size(20, 20)
                }
            })
            marker.addListener('click', e => {
              this.createInfoWindow(e,map)
              this.setState({
                activeMarker:marker
              },)
            })
            this.setState(prevState => ({
                markers:[house, ...prevState.markers]
            }))
        })
        console.log(this.state.markers)
    }

    render() {
        return(
              <Map id="myMap" options={this.mapOptions} onMapLoad={this.onMapLoad} />
        );
    }
}

export default MapContainer


//let marker = new window.google.maps.Marker({
//  position: { lat: 41.0082, lng: 28.9784 },
  //map: map,
  //title: 'Hello Istanbul!'
//});
