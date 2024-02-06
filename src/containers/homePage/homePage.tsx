import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useUser } from "../../context/UserContext";
const AccordionSection = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.accordionHeader} onPress={onPress}>
			<Text style={styles.accordionHeaderText}>{title}</Text>
		</TouchableOpacity>
	);
};

function HomePage({ navigation }) {
	const { user } = useUser();
	const [menuActive, setMenuActive] = useState(false);
	const [profileOptionsVisible, setProfileOptionsVisible] = useState(false);

	const handleNavigation = (screenName) => {
		console.log(`Navigating to ${screenName}`);
		setMenuActive(false);
	};

	const toggleMenu = () => {
		setMenuActive(!menuActive);
	};

	const handleProfileIconClick = () => {
		setProfileOptionsVisible(!profileOptionsVisible);
	};

	const handleEditProfile = () => {
		Alert.alert(
			"Edit Profile",
			"Profile edit functionality not implemented yet."
		);
		setProfileOptionsVisible(false);
	};

	const handleLogout = () => {
		Alert.alert("Log Out", "Logout functionality not implemented yet.");
		setProfileOptionsVisible(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.appBar}>
				<TouchableOpacity onPress={toggleMenu}>
					<Ionicons name="menu" size={30} color="black" />
				</TouchableOpacity>
				<Image
					source={require("../../../assets/icon.jpg")}
					style={styles.logo}
				/>
				<Text style={styles.welcomeText}>Özel Yaşam Köyü -İlkokulu </Text>
				<Text style={styles.welcomeText}>Hoşgeldin, {user?.name}!</Text>
				<View style={styles.icons}>
					<TouchableOpacity
						onPress={() => handleNavigation("Notifications")}
					>
						<Ionicons name="notifications" size={30} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleProfileIconClick}>
						<Ionicons name="person-circle" size={30} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			{menuActive && (
				<View style={styles.accordionMenu}>
					<AccordionSection
						title="Ödemeler"
						onPress={() => handleNavigation("Payments")}
					/>
					<AccordionSection
						title="Okul Gereksinimleri"
						onPress={() => handleNavigation("Requirements")}
					/>
					<AccordionSection
						title="Sınıf Gazetesi"
						onPress={() => handleNavigation("Newspaper")}
					/>
					<AccordionSection
						title="Ders Programı"
						onPress={() => handleNavigation("Schedule")}
					/>
					<AccordionSection
						title="Duyurular"
						onPress={() => handleNavigation("Announcements")}
					/>
					<AccordionSection
						title="Etkinlikler"
						onPress={() => handleNavigation("Events")}
					/>
				</View>
			)}

			{profileOptionsVisible && (
				<View style={styles.profileOptions}>
					<TouchableOpacity
						style={styles.profileOption}
						onPress={handleEditProfile}
					>
						<Text style={styles.profileOptionText}>Profili Düzenle</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.profileOption}
						onPress={handleLogout}
					>
						<Text style={styles.profileOptionText}>Çıkış</Text>
					</TouchableOpacity>
				</View>
			)}

			{}
			<View style={styles.content}>{/*TODO: Content */}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	appBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 50,
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: "#F8F8F8",
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	icons: {
		flexDirection: "row",
		width: 60,
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	accordionMenu: {
		width: "100%",
		backgroundColor: "#FFFFFF",
		paddingTop: 10,
	},
	accordionHeader: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#CCCCCC",
	},
	accordionHeaderText: {
		fontSize: 18,
		color: "black",
	},
	logo: {
		width: 50,
		height: 50,
		resizeMode: "contain",
	},
	profileOptions: {
		position: "absolute",
		right: 10,
		top: 90,
		backgroundColor: "white",
		width: 150,
		borderRadius: 5,
		elevation: 10,
		zIndex: 1000,
	},
	profileOption: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#CCCCCC",
	},
	profileOptionText: {
		fontSize: 16,
		color: "black",
	},
});

export default HomePage;
