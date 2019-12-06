import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ShoppingItem from './ShoppingItem';//model class
import ListItem from './components/ListItem';
import InputItem from './components/InputItem';
import History from './History';



const MainList = (props) => {

    const {itemsList} = props;

    //filtering data to display only not bought items

    itemsList.forEach(element => {
        if(element.isCompleted === 1)
        {//if it has been completed
            itemsList.splice(itemsList.indexOf(element) , 1);//remove it
        }
        return itemsList;
    });

    const [courseGoals, setCourseGoals] = useState([]);//empty array, which will grow as we press btn
    const [displayContainer, setDisplayContainer] = useState(false);
    const [displayHistory, setDisplayHistory] = useState(false);

    //onClick function
    const addGoalHandler = goalTitle => {
        setCourseGoals(currentGoals => [
            ...currentGoals,
            {
                id: Math.random().toString(),
                value: goalTitle
            }
        ]);//... is called spread operator, native to JS. it creates a new array with the element you're adding at the end
        setDisplayContainer(false);
    };

    const displayHistoryHandler = () =>{
        setDisplayHistory(false);
    };

    const removeGoalHandler = firebaseKey => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== firebaseKey);
        });

        firebase.database()
            .ref('shopping/')//table name
            .child(firebaseKey)//entry to remove
            .remove()
            .then(() => {
                console.log('DELETED!');
            }).catch((error) => {
                console.log(error);
            });;
    }

    const cancelGoal = () => {
        setDisplayContainer(false);
    };

    console.log(itemsList);

    return (
        <View style={styles.screen} >

            <InputItem visible={displayContainer} onAddGoal={addGoalHandler} onCancel={cancelGoal} />
            <History visible={displayHistory} onClose={displayHistoryHandler} list = {itemsList}/>

            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item.fireID}
                    style={styles.list}
                    data={itemsList}
                    renderItem={itemData =>
                        (
                            <ListItem
                                id={itemData.item.fireID}
                                onDelete={removeGoalHandler}
                                title={itemData.item.itemName} />
                        )} />
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.historyContainer} onPress ={() => {setDisplayHistory(true)}}>
                    <View style={styles.historyContainer}>
                        <Text style={styles.text}>History</Text>
                        <Ionicons name='md-list' size={32} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.refreshContainer}>
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