import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { BASE_API_URL } from "../../../config";

function SignInPage({ navigation }) {
	const [showEmailSignIn, setShowEmailSignIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isButtonHovered, setIsButtonHovered] = useState(false);
	const handleButtonPressIn = () => {
		setIsButtonHovered(true);
	};

	const handleButtonPressOut = () => {
		setIsButtonHovered(false);
	};
	const signIn = async () => {
		try {
			const response = await fetch(`${BASE_API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mail: username,
					password: password,
				}),
			});

			if (response.ok) {
				const data = await response.text();
				navigation.navigate('Home');
			} else {
				Alert.alert("Giriş başarısız", "Kullanıcı adı veya şifre yanlış");
			}
		} catch (error) {
			Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
		}
	};

	const renderEmailSignInForm = () => (
		<View>
			<Text style={styles.label}>Kullanıcı Adı</Text>
			<TextInput
				style={styles.input}
				placeholder="Kullanıcı adını gir"
				value={username}
				onChangeText={setUsername}
			/>

			<Text style={styles.label}>Şifre</Text>
			<TextInput
				style={styles.input}
				placeholder="Şifreni gir"
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

				{showEmailSignIn ? (
					renderEmailSignInForm()
				) : (
					<>
						<TouchableOpacity
							style={styles.emailButton}
							onPress={() => setShowEmailSignIn(true)}
						>
							<Ionicons name="mail" size={24} color="black" />
							<Text>E-posta ile giriş yap</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.googleButton}>
							<Ionicons name="logo-google" size={24} color="white" />
							<Text>Google ile giriş yap</Text>
						</TouchableOpacity>
					</>
				)}

				<View style={styles.footer}>
					<Text>Hesabın yok mu? </Text>
					<Text
						style={styles.signUpLink}
						onPress={() => navigation.navigate("SignUp")}
					>
						Şimdi Oluştur
					</Text>
				</View>
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
});

export default SignInPage;
