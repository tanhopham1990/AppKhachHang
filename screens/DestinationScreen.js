import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, SafeAreaView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';

const DestinationScreen = () => {
  const [destination, setDestination] = useState(null);
  const [mapKey, setMapKey] = useState(1);
  const navigation = useNavigation();
  const destinationAddress = useState(null);
  const route = useRoute();
  const {pickupLocation, pickupAddress} = route.params; // Nhận pickupLocation từ tham số

  useEffect(() => {
    if (destination) {
      alert(destination.latitude);
      // Xử lý logic với pickupLocation và destination ở đây
      setMapKey(prevKey => prevKey + 1); // Tăng giá trị key để render lại component
    }
  }, [destination]);

  const handleDiemDen = () => {
    navigation.navigate('ConfirmationScreen', {
      pickupLocation,
      pickupAddress,
      destination,
      destinationAddress,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GooglePlacesAutocomplete
          placeholder="Nhập điểm đến"
          styles={mapInputStyles}
          fetchDetails={true}
          returnKeyType={'search'}
          minLength={2}
          onPress={(data, details = null) => {
            const selectedLocation = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setDestination(selectedLocation);
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
          latitude: destination ? destination.latitude : 0,
          longitude: destination ? destination.longitude : 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{
            latitude: destination ? destination.latitude : 0,
            longitude: destination ? destination.longitude : 0,
          }}
          title="Điểm Đến"
        />
      </MapView>

      <Button title="Chọn điểm đến" onPress={handleDiemDen} />
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

export default DestinationScreen;
