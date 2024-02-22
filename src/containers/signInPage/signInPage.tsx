import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { BASE_API_URL } from "../../../config";
import { useUser } from "../../context/UserContext";
import axios from 'axios';
function SignInPage({ navigation }) {
	const [showEmailSignIn, setShowEmailSignIn] = useState(true);
	const [tckn, setTckn] = useState("");
	const [password, setPassword] = useState("");
	const [isButtonHovered, setIsButtonHovered] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const handleButtonPressIn = () => {
		setIsButtonHovered(true);
	};

	const handleButtonPressOut = () => {
		setIsButtonHovered(false);
	};
	const { setUser } = useUser();
	const signIn = async () => {
		try {
		  const response = await fetch(`${BASE_API_URL}/users/login`, {
			 method: "POST",
			 headers: {
				"Content-Type": "application/json",
			 },
			 body: JSON.stringify({
				tckn: tckn, 
				password: password,
			 }),
		  });
  
		  if (response.ok) {
			 const data = await response.text();
			 navigation.navigate('MainPage');
		  } else {
			 Alert.alert("Giriş başarısız", "TC kimlik numarası veya şifre yanlış");
		  }
		} catch (error) {
		  Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
		}
	 };

	const renderEmailSignInForm = () => (
		<View>
			<Text style={styles.label}>TC Kimlik No</Text>
			<TextInput
				style={styles.input}
				placeholder="TC kimlik numaranızı girin "
				value={tckn}
				onChangeText={setTckn}
			/>

			<Text style={styles.label}>Şifre</Text>
			<TextInput
				style={styles.input}
				placeholder="Şifrenizi girin"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={true}
			/>

			<TouchableOpacity
				style={[
					styles.signInButton,
					isButtonHovered && styles.signInButtonHovered,
				]}
				onPress={signIn}
				onPressIn={handleButtonPressIn}
				onPressOut={handleButtonPressOut}
			>
				<Text style={styles.signInButtonText}>Giriş Yap</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.forgotPasswordButton}
				onPress={() => navigation.navigate("ResetPasswordPage")}
			>
				<Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.signInContainer}>
				<Text style={styles.headerText}>Giriş Yap</Text>
	
				{renderEmailSignInForm()}
	
				<View style={styles.footer}>
					<Text>Hesabın yok mu? </Text>
					<Text
						style={styles.signUpLink}
						onPress={() => navigation.navigate("SignUp")}
					>
						Şimdi Oluştur
					</Text>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredModalView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>{modalMessage}</Text>
							<TouchableOpacity
								style={styles.buttonClose}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.textStyle}>Tamam</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	signInContainer: {
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
		width: 300,
	},
	headerText: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	emailButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#eaeaea",
		marginBottom: 10,
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#DB4437",
	},
	footer: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signUpLink: {
		color: "blue",
		textDecorationLine: "underline",
	},
	label: {
		fontSize: 14,
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#eaeaea",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
	},
	signInButton: {
		backgroundColor: "#229892",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginBottom: 10,
	},
	signInButtonHovered: {
		backgroundColor: "#0f8580",
	},
	signInButtonText: {
		color: "#ffffff",
	},
	forgotPasswordButton: {
		alignItems: "center",
	},
	forgotPasswordText: {
		color: "#673AB7",
		textDecorationLine: "underline",
	},
	centeredModalView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "bold",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default SignInPage;
