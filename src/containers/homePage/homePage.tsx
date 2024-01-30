import React from "react";
import { StyleSheet, Text, View } from "react-native";

function HomePage() {
	return (
		<View style={styles.container}>
			<Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default HomePage;
