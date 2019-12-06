import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ShoppingItem from './ShoppingItem';//model class
import ListItem from './components/ListItem';
import InputItem from './components/InputItem';
import History from './History';





const MainList = (props) => {

    let { firebaseList } = props;

    const [itemsList, setItemsList] = useState(firebaseList);//empty array, which will grow as we press btn
    const [displayContainer, setDisplayContainer] = useState(false);
    const [displayHistory, setDisplayHistory] = useState(false);
    const [refreshing, setRefreshing] = useState(false);



    //filtering data to display only not bought items

    let filteredList = [];

    itemsList.forEach(element => {
        if (element.isCompleted === 0) {//if it has been completed
            // console.log(element);
            filteredList.push(element);//remove it
        }
    });

    //onClick function
    const addItemHandler = () => {
        setDisplayContainer(false);
    };

    const displayHistoryHandler = () => {
        setDisplayHistory(false);
    };

    const removeGoalHandler = (firebaseKey, shoppingItem) => {

        setItemsList(currentList => 
        {//visually removing from list
            return currentList.filter(item => item.fireID !== firebaseKey);
        });

        let now = new Date();

        firebase.database().ref('shopping/' + firebaseKey).set(
            {
                enteredDate: shoppingItem.enteredDate,
                itemName: shoppingItem.itemName,
                isCompleted: 1,
                completedDate: (now.getDay()) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() +
                    ' at ' +
                    now.getHours() + 'h' + now.getMinutes() + 'm' + now.getSeconds() + 's',
            }
        ).then(() => {
            console.log('Updated !');
        }).catch((error) => {
            console.log(error);
        });

        // firebase.database()
        //     .ref('shopping/')//table name
        //     .child(firebaseKey)//entry to remove
        //     .remove()
        //     .then(() => {
        //         console.log('DELETED!');
        //     }).catch((error) => {
        //         console.log(error);
        //     });
    }

    const cancelGoal = () => {
        setDisplayContainer(false);
    };

    // console.log(itemsList);

    useEffect(() => {
        setRefreshing(true);
    }, () => { refreshList() }
    );



    return (
        <View style={styles.screen} >

            <InputItem visible={displayContainer} onAddGoal={addItemHandler} onCancel={cancelGoal} />
            <History visible={displayHistory} onClose={displayHistoryHandler} list={itemsList} />

            <Text style={styles.titleText}>Items pending: {filteredList.length} </Text>

            <View style={styles.listContainer}>
                <FlatList

                    // onRefresh={handleRefresh}
                    refreshing={refreshing}

                    keyExtractor={item => item.fireID}
                    style={styles.list}
                    data={filteredList}
                    renderItem={itemData =>
                        (
                            <ListItem
                                id={itemData.item.fireID}
                                onDelete={removeGoalHandler}
                                title={itemData.item.itemName}
                                item={itemData.item} />
                        )} />
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.historyContainer} onPress={() => { setDisplayHistory(true) }}>
                    <View style={styles.historyContainer}>
                        <Text style={styles.text}>History</Text>
                        <Ionicons name='md-list' size={32} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.refreshContainer} onPress={() => { setRefreshing(true) }}>
                    <View style={styles.refreshContainer}>
                        <Text style={styles.textR}>Refresh</Text>
                        <Ionicons name='md-refresh' size={32} color='white' />
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setDisplayContainer(true)} style={styles.buttonContainer} >
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
        // backgroundColor: Platform.OS === 'android' ? '#000' : '#ff0'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#000'
    },
    list: {
        // backgroundColor: '#bbffbb',
        // marginHorizontal: 20
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
    refreshContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: '#6666ff',
        marginVertical: 10,
        marginLeft: 5
    },
    historyContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: '#ffff66',
        marginVertical: 10,
        marginRight: 5
    },
    text: {
        fontSize: 16
    },
    textR: {
        fontSize: 16,
        color: 'white'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    }
});

export default MainList;