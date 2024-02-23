import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../homePage/homePage";
import EventPage from '../eventPage/eventPage'
import AnnouncementPage from '../announcementPage/announcementPage'
import NewspaperPage from '../newspaperPage/newspaperPage'
import PaymentPage from '../paymentPage/paymentPage'
import ProfilePage from '../profilePage/profilePage'
import RequirementPage from '../requirementPage/requirementPage'
import SchedulePage from '../schedulePage/schedulePage'
import MyTickets from '../myTickets/myTickets';
import { HeaderMenu, HeaderTitle, HeaderNotifications } from '../header/header';

const Stack = createStackNavigator();

function MenuPages() {
	return (
		<Stack.Navigator initialRouteName="Ana Sayfa">
			<Stack.Screen
				name="Ana Sayfa" 
				component={HomePage}
				options={{ 
					headerLeft: () => <HeaderMenu/>,
					headerTitle: () => <HeaderTitle/>,
					headerRight: () => <HeaderNotifications/>
				}}
			/>
			<Stack.Screen
				name="Etkinlikler" 
				component={EventPage}
			/>
			<Stack.Screen
				name="Duyurular" 
				component={AnnouncementPage}
			/>
			<Stack.Screen
				name="Sınıf Gazetesi" 
				component={NewspaperPage}
			/>
			<Stack.Screen
				name="Ödemeler" 
				component={PaymentPage}
			/>
			<Stack.Screen
				name="Profil" 
				component={ProfilePage}
			/>
			<Stack.Screen
				name="Okul Gereksinimleri" 
				component={RequirementPage}
			/>
			<Stack.Screen
				name="Ders Programı" 
				component={SchedulePage}
			/>
			<Stack.Screen
				name="Biletlerim" 
				component={MyTickets}
			/>
		</Stack.Navigator>
	);
}

export default MenuPages;