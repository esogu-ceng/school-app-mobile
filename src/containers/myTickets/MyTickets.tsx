import React from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';

const MyTickets = () => {
    const scanQR = () => {
        if (Platform.OS === 'web') {
            // QR kod okuyucu webde çalışmamalı bence
            alert('Running on web');
        } else {
            // TODO: QR kod okuyucu
        }
    };

    return (
        <View style={styles.centeredView}>
            <Button
                title="QR Kod Okuyucu"
                color="blue"
                onPress={scanQR}
            /> 
        </View>
    );
};
export default MyTickets;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 22
    }
});