import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Linking, TouchableOpacity, Clipboard, Share } from 'react-native';

function BuyingTickets({ navigation }) {
  const [ticketCount, setTicketCount] = useState('1');
  const [email, setEmail] = useState('');
  const [ticketUrls, setTicketUrls] = useState([]);

  const handleSubmit = async () => {
    const apiUrl = 'http://localhost:8080/tickets/getSequentialTicket';
    const params = new URLSearchParams();
    params.append('activityId', '1');
    params.append('count', ticketCount); 
    params.append('email', email);

    try {
      const response = await fetch(apiUrl, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(), 
      });

      if (response.ok) {
        const urls = await response.json();
        setTicketUrls(urls);
        alert('Biletler başarıyla oluşturuldu. PDF olarak görüntülemek için biletlerinize tıklayın.');
      } else {
        const errorText = await response.text();
        alert(`Bir hata oluştu: ${errorText}`);
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu.');
    }
  };

  const copyToClipboard = (url) => {
    Clipboard.setString(url);
    alert('Bilet URL\'si kopyalandı!');
  };

  const shareTicket = async (url) => {
    try {
      const result = await Share.share({
        message: `Biletinizi buradan alabilirsiniz: ${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Almak İstediğiniz Bilet Sayısı:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={ticketCount}
        onChangeText={setTicketCount}
        placeholder="Kaç bilet almak istiyorsunuz?"
      />
      <Text style={styles.label}>E-posta Adresiniz:</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="E-posta adresinizi giriniz"
      />
      <Button title="Biletleri Al" onPress={handleSubmit} />
      {ticketUrls.map((url, index) => (
        <View key={index} style={styles.ticketContainer}>
          <Text style={styles.ticketText} onPress={() => Linking.openURL(url)}>
            Bilet #{index + 1}: Dokun ve Görüntüle
          </Text>
          <TouchableOpacity onPress={() => copyToClipboard(url)}>
            <Text style={styles.buttonText}>Kopyala</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareTicket(url)}>
            <Text style={styles.buttonText}>Paylaş</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 20,
	  backgroundColor: '#f7f7f7', 
	  justifyContent: 'center',
	},
	label: {
	  fontSize: 16,
	  color: '#333', 
	  marginBottom: 10,
	  fontWeight: 'bold',
	},
	input: {
	  marginBottom: 20,
	  paddingHorizontal: 15,
	  height: 50,
	  borderColor: "#ccc",
	  borderWidth: 1,
	  borderRadius: 25, 
	  fontSize: 16,
	  backgroundColor: '#fff', 
	},
	ticketContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#ffffff', 
		borderRadius: 8,
		marginVertical: 10,
		shadowColor: '#000000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 4,
		borderWidth: 1,
		borderColor: '#eeeeee', 
	 },
	 ticketText: {
		color: '#007bff',
		textDecorationLine: 'none',
		flex: 1,
		padding: 10,
		fontWeight: '500', 
		fontSize: 16,
	 },
	buttonText: {
	  color: '#fff',
	  backgroundColor: '#007bff',
	  paddingHorizontal: 20,
	  paddingVertical: 10,
	  borderRadius: 20, 
	  overflow: 'hidden', 
	},
 });

export default BuyingTickets;
