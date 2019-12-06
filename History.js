import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import firebase from 'firebase';

const History = (props) => {

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={{marginTop:200}}>

                <Text>History Page!!!!</Text>

                <Button onPress={props.onClose} title="Close"/>

            </View>
        </Modal>
    );
};

export default History;