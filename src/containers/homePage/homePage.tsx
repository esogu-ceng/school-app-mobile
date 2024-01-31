import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccordionSection = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.accordionHeader} onPress={onPress}>
      <Text style={styles.accordionHeaderText}>{title}</Text>
    </TouchableOpacity>
  );
};

function HomePage({ navigation }) {
  const [menuActive, setMenuActive] = useState(false);

  const handleNavigation = (screenName) => {
    console.log(`Navigating to ${screenName}`);
    setMenuActive(false);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Image source={require('../../../assets/icon.jpeg')} style={styles.logo} />
        <Text style={styles.welcomeText}>BBOM Derneği - Başka Bir Okul Mümkün</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => handleNavigation('Notifications')}>
            <Ionicons name="notifications" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Messages')}>
            <Ionicons name="mail" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {menuActive && (
        <View style={styles.accordionMenu}>
          <AccordionSection title="Ödemeler" onPress={() => handleNavigation('Payments')} />
          <AccordionSection title="Okul Gereksinimleri" onPress={() => handleNavigation('Requirements')} />
          <AccordionSection title="Sınıf Gazetesi" onPress={() => handleNavigation('Newspaper')} />
          <AccordionSection title="Ders Programı" onPress={() => handleNavigation('Schedule')} />
          <AccordionSection title="Duyurular" onPress={() => handleNavigation('Announcements')} />
        </View>
      )}

      {}
      <View style={styles.content}>
        {/*TODO: Content */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionMenu: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  accordionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  accordionHeaderText: {
    fontSize: 18,
    color: 'black',
  },
  logo: {
    width: 50,  
    height: 50,  
    resizeMode: 'contain', 
  },
});

export default HomePage;
