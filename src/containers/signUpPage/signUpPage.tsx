import React, { useContext, useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { BASE_API_URL } from "../../../config";
import { AppContext } from "../../context/AppContext";
import { useUser } from "../../context/UserContext";

const SignUpPage = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
	const [tckn, setTckn] = useState("");
	const [tcknError, setTcknError] = useState("");
	const { setUser } = useUser();
	const { dispatch } = useContext(AppContext);
	const signUp = async () => {
		try {
			const response = await fetch(`${BASE_API_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					surname: surname,
					mail: email,
					password: password,
					tckn: tckn,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setIsSignUpSuccess(true);
				setModalMessage("Kayıt işlemi başarılı.");
				dispatch({ type: "LOGIN", payload: data });
				setUser(data);
				navigation.navigate("MainPage", { userName: data.name });
			} else {
				const errorData = await response.json();
				setIsSignUpSuccess(false);
				setModalMessage(errorData.message || "Bir hata oluştu.");
				setModalVisible(true);
			}
		} catch (error) {
			console.error(error);
			setIsSignUpSuccess(false);
			setModalMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
			setModalVisible(true);
		}
	};
	const validateTckn = (text) => {
		if (!/^\d*$/.test(text)) {
			setTcknError("TC Kimlik No sadece sayısal ifade içermelidir.");
		} else if (text.length > 11||text.length < 11) {
			setTcknError("TC Kimlik No 11 hane olmalıdır.");
		} else {
			setTcknError("");
		}
		setTckn(text);
	};

	return (
		<View style={styles.container}>
			<View style={styles.signUpContainer}>
				<>
					<Text style={styles.label}>TC Kimlik No</Text>
					<TextInput
						style={styles.input}
						placeholder="TC kimlik numaranızı girin"
						value={tckn}
						onChangeText={validateTckn}
						keyboardType="numeric"
						maxLength={11}
					/>
					{!!tcknError && (
						<Text style={styles.errorText}>{tcknError}</Text>
					)}
					<Text style={styles.label}>Ad</Text>
					<TextInput
						style={styles.input}
						placeholder="Adınızı girin"
						value={name}
						onChangeText={setName}
					/>

					<Text style={styles.label}>Soyad</Text>
					<TextInput
						style={styles.input}
						placeholder="Soyadınızı girin"
						value={surname}
						onChangeText={setSurname}
					/>

					<Text style={styles.label}>E-posta</Text>
					<TextInput
						style={styles.input}
						placeholder="E-postanızı girin"
						value={email}
						onChangeText={setEmail}
					/>

					<Text style={styles.label}>Şifre</Text>
					<TextInput
						style={styles.input}
						placeholder="Şifrenizi girin"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={true}
					/>

					<TouchableOpacity style={styles.signUpButton} onPress={signUp}>
						<Text style={styles.signUpButtonText}>Kayıt Ol</Text>
					</TouchableOpacity>
				</>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>
								{isSignUpSuccess ? "Kayıt Başarılı!" : "Hata"}
							</Text>
							<Text>{modalMessage}</Text>
						</View>
					</View>
				</Modal>

				<View style={styles.footer}>
					<Text>Zaten bir hesabın var mı? </Text>
					<Text
						style={styles.signInLink}
						onPress={() => navigation.navigate("SignIn")}
					>
						Giriş Yap
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	signUpContainer: {
		padding: 20,
		borderRadius: 10,
		boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
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
	signInLink: {
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
	signUpButton: {
		backgroundColor: "#229892",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginBottom: 10,
	},
	signUpButtonText: {
		color: "#ffffff",
	},
	forgotPasswordButton: {
		alignItems: "center",
		marginTop: 10,
	},
	forgotPasswordText: {
		color: "#673AB7",
		textDecorationLine: "underline",
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	 },
});

export default SignUpPage;
