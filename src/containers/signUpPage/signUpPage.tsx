import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SignUpPage({ navigation }) {
    const [showEmailSignUp, setShowEmailSignUp] = useState(false);
    const [name, setName] = useState('');  
    const [surname, setSurname] = useState('');  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState(''); 

    const renderEmailSignUpForm = () => (
        <View>
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
            
            <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.signUpContainer}>
                <Text style={styles.headerText}>Kayıt Ol</Text>

                {showEmailSignUp ? (
                    renderEmailSignUpForm()
                ) : (
                    <>
                        <TouchableOpacity style={styles.emailButton} onPress={() => setShowEmailSignUp(true)}>
                            <Ionicons name="mail" size={24} color="black" />
                            <Text>E-posta ile kayıt ol</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleButton}>
                            <Ionicons name="logo-google" size={24} color="white" />
                            <Text>Google ile kayıt ol</Text>
                        </TouchableOpacity>
                    </>
                )}

                <View style={styles.footer}>
                    <Text>Zaten bir hesabın var mı? </Text>
                    <Text style={styles.signInLink} onPress={() => navigation.navigate("SignIn")}>Giriş Yap</Text>
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
	signUpContainer: {
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
		 color: 'blue',
		 textDecorationLine: 'underline',
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
});

export default SignUpPage;
