import React, { Component } from 'react';
import InfoWindow from '.././InfoWindow/InfoWindow';
import { render } from 'react-dom';
import { icon } from '../../utils'
import './map.css';


class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
        this.state = {
          map:null,
          markers:[],
          activeMarker:null
        }
  }

  onScriptLoad() {
      this.setState({
        map: new window.google.maps.Map(
          document.getElementById(this.props.id),
          this.props.options)
      })

      this.onMapLoad(this.state.map)
  }

  createInfoWindow(e, map) {
      const infoWindow = new window.google.maps.InfoWindow({
          content: '<div id="infoWindow"> hello </div>',
          position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
      })
      infoWindow.addListener('domready', e => {
          render(<InfoWindow marker = {this.state.activeMarker} data = {this.props.data}/>, document.getElementById('infoWindow'))
      })
      infoWindow.open(map)
  }

  clearMarkers(){
      let markers = this.state.markers;
      markers.forEach((marker)=>{
          marker.setMap(null)
      })
      markers = []
      this.setState({
        markers
      })
  }

  correctZIndex(activeMarker){
  let markers = this.state.markers;
  markers.forEach((marker)=>{
    marker.setZIndex(0)
  })
  activeMarker.setZIndex(100)
  }

  onMapLoad(map){

      this.clearMarkers()

      this.props.data.forEach(house => {

          let marker = new window.google.maps.Marker({
              map:map,
              position:house.position,
              name:house.name,
              id:house.id,
              icon:{
                  url: house.icon || icon({text:house.price}),
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor:new window.google.maps.Point(30,30)
              }
          })

          this.setState((prevState) => ({
              markers:[marker, ...prevState.markers]
          }), ()=>console.log(this.state));

          marker.addListener('click', e => {
              this.setState({
                  activeMarker:marker
              })
              this.createInfoWindow(e,map)
              this.onMapLoad(this.state.map)
              console.log(this.props.markers)
          })

          marker.addListener('mouseover', e => {
              marker.setIcon({
                url:icon({center:'2ee1ff', color:'2ee1ff', text:house.price}),
                scaledSize: new window.google.maps.Size(60,60),
                anchor: new window.google.maps.Point(30,30)
              })
              this.correctZIndex(marker)
          })

          marker.addListener('mouseout', e => {
              marker.setIcon({
                url:icon({center:'3cc194', text:house.price}),
                scaledSize: new window.google.maps.Size(60,60),
                anchor: new window.google.maps.Point(30,30)
              })
          })
      })
  }






  componentDidMount() {
    if (!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAGgm00r51Xpx2wUfWvvKUMNWd6GrjV6Ck`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        // Below is important.
        //We cannot access google.maps until it's finished loading
        s.addEventListener('load', e => {
          this.onScriptLoad()
        })
    } else {
        this.onScriptLoad()
    }




  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
}

export default Map
