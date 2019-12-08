import React, { useState } from 'react';
import { View, Button, StyleSheet, Modal, FlatList, Alert } from 'react-native';
import HistoryItem from './components/HistoryItem';
import firebase from 'firebase';

const History = (props) => {

    const { list } = props;//extracting list from props

    const [itemsList, setItemsList] = useState(list);
    const [itemDeleted, setItemDeleted] = useState('');

    const render = (itemData) => {
        //removing the deleted item visually so we don't need to send another request to Firebase
        if (itemData.item.fireID !== itemDeleted) {
            return (
                <HistoryItem
                    onDelete={removeItemHandler}
                    item={itemData.item} />
            );
        }

    };

    const removeItemHandler = (shoppingItem) => {

        //broke this operation in two functions for better functionallity
        Alert.alert
            (
                'Warning', //title
                'This item will be\npermanently deleted', //message
                [{ text: 'Delete Item', style: 'default', onPress: () => deleteItemFromFirebase(shoppingItem.fireID) }, //button 1
                { text: 'Cancel', style: 'cancel' }] //button 2
            );
    }

    const deleteItemFromFirebase = (key) => {

        setItemDeleted(key);//updating our array

        setItemsList(currentList => {//visually removing from list
            return currentList.filter(item => item.fireID !== key);
        });

        firebase.database()
            .ref('shopping/')//table name
            .child(key)//entry to remove
            .remove()
            .then(() => {
                //display message
                Alert.alert('Shopping Item Deleted');
                console.log('DELETED!');
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.screen}>

                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={item => item.fireID}
                        style={styles.list}
                        data={list.filter(item => item.isCompleted === 1)}
                        renderItem={render} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={props.onClose} title="Go Back" />
                </View>

            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 50
    },
    listContainer: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 5
    }
});

export default History;