import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { BASE_API_URL } from "../../../config";

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString("tr-TR", options);
};

const formatCurrency = (amount) => {
	return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
 };
 const EventCard = ({ event, onBuyTicket }) => {
	return (
	  <View style={styles.card}>
		 <Text style={styles.title}>{event.activityName}</Text>
		 <Text>{`Tarih: ${formatDate(event.activityDate)}`}</Text>
		 <Text>{`Ücret: ${formatCurrency(event.fee)}`}</Text>
		 <View style={styles.buttonContainer}>
			<Button title="Bilet Al" onPress={() => onBuyTicket(event)} />
		 </View>
	  </View>
	);
 };

function EventPage({ navigation }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(`http://localhost:8080/activities`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new TypeError("Oops, we haven't got JSON!");
				}
				const data = await response.json();
				setEvents(data);
			} catch (error) {
				if (error.response) {
					 console.error("Hata Durum Kodu:", error.response.status);
					 console.error("Hata Yanıt Başlıkları:", error.response.headers);
				} else {
					 console.error("Etkinlikler yüklenirken bir hata oluştu:", error);
				}
		  }
		};

		fetchEvents();
	}, []);

	const handleBuyTicket = (event) => {
		navigation.navigate('BuyingTickets', { eventId: event.id });
	 };

	return (
		<View style={styles.container}>
			<FlatList
				data={events}
				renderItem={({ item }) => (
					<EventCard
						event={item}
						onBuyTicket={() => handleBuyTicket(item)}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
	},
	card: {
		backgroundColor: "#fff",
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 20,
		borderRadius: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
});

export default EventPage;
