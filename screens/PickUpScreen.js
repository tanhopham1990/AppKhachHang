import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, SafeAreaView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

const PickUpScreen = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [mapKey, setMapKey] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (pickupLocation) {
      alert(pickupLocation.latitude);
      alert(pickupAddress);
      // Xử lý logic với pickupLocation và destination ở đây
      setMapKey(prevKey => prevKey + 1); // Tăng giá trị key để render lại component
    }
  }, [pickupLocation, pickupAddress]);

  useEffect(() => {
    // Lấy vị trí hiện tại sử dụng Geolocation
    Geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setPickupLocation(currentLocation);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const handleDiemDon = () => {
    navigation.navigate('DestinationScreen', {pickupLocation, pickupAddress});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GooglePlacesAutocomplete
          placeholder="Nhập điểm đón"
          styles={mapInputStyles}
          fetchDetails={true}
          returnKeyType={'search'}
          minLength={2}
          predefinedPlaces={[pickupLocation]} // Thiết lập vị trí hiện tại làm mặc định
          onPress={(data, details = null) => {
            console.log(details);
            const selectedLocation = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setPickupLocation(selectedLocation);
            setPickupAddress(details.formatted_address);
          }}
          enablePoweredByContainer={false}
          query={{
            key: 'AIzaSyCo6wZeVGeNV72V295TZHoCtHlE1RR_imQ',
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
      </View>
      <MapView
        key={mapKey}
        style={styles.map}
        initialRegion={{
          latitude: pickupLocation ? pickupLocation.latitude : 0,
          longitude: pickupLocation ? pickupLocation.longitude : 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{
            latitude: pickupLocation ? pickupLocation.latitude : 0,
            longitude: pickupLocation ? pickupLocation.longitude : 0,
          }}
          title="Điểm Đón"
        />
      </MapView>

      <Button title="Chọn điểm đón" onPress={handleDiemDon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#DDDDDF',
  },
  map: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
});

const mapInputStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
});

export default PickUpScreen;
