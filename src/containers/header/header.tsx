import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export function HeaderMenu() {
	const navigation = useNavigation();
	return (
	    <TouchableOpacity 
	    	style={styles.menu} 
	    	onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
	    >
	      	<Ionicons name="menu" size={30} color="black" />
	    </TouchableOpacity>
  	);
}

export function HeaderTitle(){
	return (
		<View>
  			<View>
    			<Image source={require('../../../assets/icon.jpg')} style={styles.logo} />
    		</View>
    	</View>
  	);
}

export function HeaderNotifications() {
  
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('')}>
            <Ionicons name="notifications" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,  
    height: 50,  
    resizeMode: 'contain', 
  },
  menu: {
	paddingLeft: 10,
  }
});