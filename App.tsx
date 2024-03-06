import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    	 setScanned(true);
		 //replace string
		 data = data.replace("8443", "8444");
		 axios.post(data)
		.then(response => {
			setResponse(response.data);
		})
		.catch(error => {
			setResponse({seatLine: '', seatNumber: '', currentStatus: 'GEÇERSİZ BİLET'});
		});
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  const renderValid = () => {
    return (
      <View style={styles.validContainer}>
        <Text style={styles.title}>Geçerli bilet</Text>
		<Text style={styles.title}>{response.seatLine} - {response.seatNumber}</Text>
      </View>
    );
  };

  const renderNotValid = () => {
    return (
      <View style={styles.notValidContainer}>
        <Text style={styles.title}>Geçersiz bilet</Text>
		<Text style={styles.title}>{response.seatLine} - {response.seatNumber} - {response.currentStatus}</Text>
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni verilmedi.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konser Alanına hoş geldiniz!</Text>
      <Text style={styles.paragraph}>Bilette yer alan Karekodu okutunuz</Text>
      {!response && renderCamera()}
	  {response && response.currentStatus == 'VALID' && renderValid()}
	  {response && response.currentStatus != 'VALID' && renderNotValid()}
	  <TouchableOpacity
        style={styles.button}
        onPress={() => {
			setScanned(false);
			setResponse(null);
		}}
      >
        <Text style={styles.buttonText}>Yeni Bilet Oku</Text>
      </TouchableOpacity>
	  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
	center: true
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40
  },
  validContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
	backgroundColor: 'green',
	alignItems: 'center',
    justifyContent: 'center',
  },
  notValidContainer: {
	width: '80%',
	aspectRatio: 1,
	overflow: 'hidden',
	borderRadius: 10,
	marginBottom: 40,
	backgroundColor: 'red',
	alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});