import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'

export class MapContainer extends React.Component {
render(props) {
  console.log(this.props.area.lat)
    return (
      <Map
          google={this.props.google}
          zoom={10}
          style={{width: '100%', height: '100%', position: 'relative'}}
          // initialCenter=({
          //   lat: this.state.lat
          //   lng: this.state.lng
          // })
          initialCenter={{
            lat: this.props.area.lat,
            lng: this.props.area.lon
          }}
          >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCgsK8LBQfMgK9mfDR8UbemUVokERlYOCY")
})(MapContainer)
