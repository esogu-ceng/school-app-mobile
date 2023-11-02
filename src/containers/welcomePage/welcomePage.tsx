import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { AppContext } from "../../context/AppContext";
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

function WelcomePage({ navigation }) { 
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (state.user !== null) {
      navigation.navigate("Home"); 
    }
  }, [state.user]);

  const handleLogin = () => {
    navigation.navigate("SignIn"); 
  };

  const handleRegister = () => {
    navigation.navigate("SignUp"); 
  };

  return (
    <View style={styles.welcomePage}>
      <Text style={{ fontSize: 24 }}>Hoş Geldiniz!</Text>
      <Text>Uygulamamızı kullanarak ödemelerinizi takip edebilir ve taksitlendirebilirsiniz.</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={handleLogin} style={styles.button}>
          <Ionicons name='mail' size={24} color="black" />
          <Text>Giriş Yap</Text>
        </Button>
        <Button onPress={handleRegister} style={styles.button}>
          <Ionicons name='person' size={24} color="black" />
          <Text>Kayıt Ol</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomePage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef2f7',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    height: 60,
    width: 200,
    borderRadius: 25,
  }
});

export default WelcomePage;
