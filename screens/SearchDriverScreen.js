import React, {useState} from 'react';
import {View, Text, Button, Modal, StyleSheet} from 'react-native';

const SearchDriverScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const startSearch = () => {
    setIsSearching(true);

    // Simulate searching for the nearest driver (API call or other logic)
    setTimeout(() => {
      setIsSearching(false);
      // Simulated driver data (replace this with actual driver data from API)
      const driverData = {
        name: 'Driver Name',
        carModel: 'Car Model',
        licensePlate: 'License Plate',
      };
      setSelectedDriver(driverData);
    }, 3000); // Simulated search delay of 3 seconds
  };

  return (
    <View style={styles.container}>
      <Button title="Tìm Tài Xế Gần Nhất" onPress={startSearch} />

      <Modal visible={isSearching} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Đang tìm tài xế gần nhất...</Text>
        </View>
      </Modal>

      {selectedDriver && (
        <View style={styles.driverInfoContainer}>
          <Text>Tài Xế: {selectedDriver.name}</Text>
          <Text>Model Xe: {selectedDriver.carModel}</Text>
          <Text>Biển Số Xe: {selectedDriver.licensePlate}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  driverInfoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
});

export default SearchDriverScreen;
