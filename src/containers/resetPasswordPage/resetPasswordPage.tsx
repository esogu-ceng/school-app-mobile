import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function ResetPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    //TODO: Şifre sıfırlama işlemlerini burada gerçekleştirilecek
    console.log("Şifre sıfırlama linki gönderildi: ", email);
  };
  const goBack = () => {
	navigation.goBack();
 };
 const navigateToSignInPage=()=>{
	navigation.navigate('SignIn');
 }
  return (
	<View style={styles.container}>
	  <View style={styles.formContainer}>
		 <Text style={styles.headerText}>Şifre Yenileme</Text>

		 <TextInput
			style={styles.input}
			onChangeText={setEmail}
			value={email}
			placeholder="E-Posta"
			keyboardType="email-address"
		 />

		 <TouchableOpacity
			style={styles.resetButton}
			onPress={handleResetPassword}
		 >
			<Text style={styles.resetButtonText}>Şifremi Yenile</Text>
		 </TouchableOpacity>

		 <TouchableOpacity
		 	style={styles.returnSignInButton}
          onPress={navigateToSignInPage}
        >
          <Text style={styles.returnSignInButtonText}>Giriş</Text>
        </TouchableOpacity>

	  </View>
	</View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white", 
    width: '90%',
    maxWidth: 300,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 5,
    padding: 10,
  },
  resetButton: {
    backgroundColor: "#229892",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 12,
  },
  returnSignInButton:{
	backgroundColor: "#229892",
	padding: 15,
	borderRadius: 5,
	alignItems: "center",
	marginVertical: 12,
  },
  returnSignInButtonText:{
	color: "white",
	fontWeight: "bold",
	fontSize: 16,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ResetPasswordPage;
