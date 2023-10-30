import {useRoute} from '@react-navigation/native';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text, Button} from 'react-native';
import MapView from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.7625;
const LONGITUDE = 106.6823;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCo6wZeVGeNV72V295TZHoCtHlE1RR_imQ';

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        '227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Vietnam',
        'Sạp 1000, Chợ Bến Thành, Quận 1, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Vietnam',
      ],
    };

    this.mapView = null;
  }

  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  onReady = result => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10,
      },
    });
  };

  onError = errorMessage => {
    console.log(errorMessage);
  };

  setDistance(distance, duration_in_traffic) {
    // console.log('setDistance');
    this.setState({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic),
    });
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={{flex: 1}}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}>
          <MapViewDirections
            origin={this.state.coordinates[0]}
            destination={
              this.state.coordinates[this.state.coordinates.length - 1]
            }
            waypoints={this.state.coordinates.slice(1, -1)}
            mode="DRIVING"
            apikey={GOOGLE_MAPS_APIKEY}
            language="en"
            strokeWidth={4}
            strokeColor="black"
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${
                  params.destination
                }"${
                  params.waypoints.length
                    ? ' using waypoints: ' + params.waypoints.join(', ')
                    : ''
                }`,
              );
            }}
            onReady={this.onReady}
            onError={errorMessage => {
              console.log(errorMessage);
            }}
            resetOnChange={false}
          />
        </MapView>
        <Button title="Xác nhận" />
      </View>
    );
  }
}

export default ConfirmationScreen;
