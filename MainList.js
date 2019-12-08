import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import ShoppingItem from './ShoppingItem';//model class
import ListItem from './components/ListItem';
import InputItem from './components/InputItem';
import History from './History';

const MainList = (props) => {

    let { firebaseList } = props;

    const [itemsList, setItemsList] = useState(firebaseList);//making our list a state so it can grow visually as we add items
    const [historyList, setHistoryList] = useState(itemsList);//different list which will change as we mark items bought
    const [displayContainer, setDisplayContainer] = useState(false);
    const [displayHistory, setDisplayHistory] = useState(false);
    //initializing both modals to false so we can only see them as we press buttons


    //filtering data to display only pending shopping items
    let filteredList = [];

    itemsList.forEach(element => {
        if (element.isCompleted === 0) {//if it hasn't been completed
            filteredList.push(element);//add it
        }
    });

    //adding item visually to list
    const addItemHandler = (item) => {
        setItemsList(itemsList => [
            ...itemsList, item
        ]);

        setDisplayContainer(false);
    };

    const displayHistoryHandler = () => {
        setDisplayHistory(false);
    };

    //remove from pending list
    const removeItemHandler = (shoppingItem) => {

        setItemsList(currentList => {//visually removing from list
            return currentList.filter(item => item.fireID !== shoppingItem.fireID);
        });

        let now = new Date();

        let updatedItem = new ShoppingItem
        (
            shoppingItem.fireID,
            shoppingItem.itemName,
            shoppingItem.enteredDate,
            1,
            (now.getDate()) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() +
            ' at ' +
            now.getHours() + 'h' + now.getMinutes() + 'm' + now.getSeconds() + 's'
        );

        //building updated item object

        setHistoryList(historyList => [//updating history list via our array state
            ...historyList, updatedItem
        ]);

        //updating firebase
        firebase.database().ref('shopping/' + updatedItem.fireID).set(
            {
                enteredDate: updatedItem.enteredDate,
                itemName: updatedItem.itemName,
                isCompleted: updatedItem.isCompleted,
                completedDate: updatedItem.completedDate,
            }
        ).then(() => {
            console.log('Updated !');
        }).catch((error) => {
            console.log(error);
        });
    }

    const cancelInput = () => {
        setDisplayContainer(false);
    };

    return (
        <View style={styles.screen} >

            <InputItem visible={displayContainer} onAddItem={addItemHandler} onCancel={cancelInput} />
            <History visible={displayHistory} onClose={displayHistoryHandler} list={historyList} />

            <Text style={styles.titleText}>
                My Shopping List
            </Text>

            <Text style={styles.titleText}>
                Items pending: {filteredList.length} 
            </Text>

            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item.fireID}
                    style={styles.list}
                    data={filteredList}
                    renderItem={itemData =>
                        (
                            <ListItem //my own custom item component
                                onDelete={removeItemHandler}
                                item={itemData.item} />
                        )} />
            </View>


            <TouchableOpacity style={styles.historyContainer} onPress={() => { setDisplayHistory(true) }}>
                <View style={styles.historyContainer}>
                    <Text style={styles.text}>History</Text>
                    <Ionicons name='md-list' size={32} color='#000' />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => setDisplayContainer(true)} >
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>Add New Item</Text>
                    <Ionicons name='md-add' size={32} color='#323232' />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
        flex: 1,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#000',
        marginVertical:5
    },
    listContainer: {
        flex: 8,
        margin: 20
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: '#66ff66',
    },
    historyContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: '#ffff66',
        marginVertical: 10,
        paddingLeft:18,
        paddingRight:18
    },
    text: {
        fontSize: 16
    },
});

export default MainList;