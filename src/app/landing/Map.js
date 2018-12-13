import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic'
import mapboxgl from '../credentials/mapbox'



export default class Map extends React.PureComponent {
  state = {
    lng: -71.020000,
    lat: 42.362400,
    zoom: 10.0
  };

  componentDidMount() {
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/moflo/cjpm243u904ue2smu3hhen462',
    center: [lng, lat],
    zoom
    });

    map.on('move', () => {
    const { lng, lat } = map.getCenter();

    // this.setState({
    //   lng: lng.toFixed(4),
    //   lat: lat.toFixed(4),
    //   zoom: map.getZoom().toFixed(2)
    // })
    })
    
 }

  render() {
  return (
    <div ref={el => this.mapContainer = el} className="absolute top right left bottom" style={{ height: 300 }} />
    );
  }
}
