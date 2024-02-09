import React from 'react'
import {View, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer"
import MenuPages from '../menuPages/menuPages';
import {useNavigation} from '@react-navigation/native'


const DrawerList = [
	{label: 'Duyurular', navigateTo: 'Duyurular'},
	{label: 'Etkinlikler', navigateTo: 'Etkinlikler'},
	{label: 'Sınıf Gazetesi', navigateTo: 'Sınıf Gazetesi'},
	{label: 'Ödemeler', navigateTo: 'Ödemeler'},
	{label: 'Okul Gereksinimleri', navigateTo: 'Okul Gereksinimleri'},
	{label: 'Ders Programı', navigateTo: 'Ders Programı'},
	{label: 'Profil', navigateTo: 'Profil'},
];

const DrawerLayout = ({label, navigateTo}) => {
	const navigation = useNavigation();
	return (
		<DrawerItem 
			label={label}
			onPress={() => {navigation.navigate(navigateTo);}}
		/>
	);
};

const DrawerItems = props => {
	return DrawerList.map((el, i) => {
		return (
			<DrawerLayout 
				key={i}
				label={el.label}
				navigateTo={el.navigateTo}
			/>
		);
	});
};

function DrawerContent(props) {
	const navigation = useNavigation();
	return (
		<View style={styles.navigator}>
			<View style={styles.topDrawerSection}>
				<Text>Kullanıcı ismi</Text>
			</View>
			<DrawerItems />
			<View style={styles.bottomDrawerSection}>
        		<DrawerItem 
        			label={'Çıkış'}
        			onPress={()=>navigation.navigate('')}
        		/>
      		</View>
		</View>
	);
};

const Drawer = createDrawerNavigator();

function MainPage() {
	return (
		<Drawer.Navigator 
			screenOptions={{headerShown:false}}
			drawerContent={props => <DrawerContent {...props} />}
		>
			<Drawer.Screen name='AnaSayfa' component={MenuPages} />
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
  navigator: {
	flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  topDrawerSection: {
	flexDirection: 'row', 
	marginTop: 15,
	paddingLeft: 20,
	borderBottomWidth: 1,
	borderBottomColor: '#dedede',
	paddingTop:20,
  },
});

export default MainPage;