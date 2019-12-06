import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import firebase from 'firebase';

const InputItem = props => {

    const [enteredItem, setEnteredGoal] = useState('');//empty string argument as default, function to change the text 

    //function in a function
    const goalInputHandler = (enteredText) => {//this JS syntax is identical to having a function
        setEnteredGoal(enteredText);
    };

    const addToFirebase = () => {

        props.onAddGoal();
        // setEnteredGoal('');

        let now = new Date();

        firebase.database().ref('shopping/').push(
            {
                itemName: enteredItem,

                enteredDate: //building date string 05/12/2019 at 11h31m19s
                    (now.getDay()) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() +
                    ' at ' +
                    now.getHours() + 'h' + now.getMinutes() + 'm' + now.getSeconds() + 's',

                isCompleted: 0,
                completedDate: 'not Completed',

            }
        ).then(() => {
            console.log('INSERTED !');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Modal visible={props.visible} animationType='slide' >
            <View style={styles.inputContainer} >

                <TextInput
                    placeholder="New Item"
                    placeholderTextColor="#323232"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredItem} />

                <View style={styles.buttons}>

                    <View style={styles.button} >

                        <Button title="Cancel" color="red" onPress={props.onCancel} />

                    </View>
                    <View style={styles.button} >

                        <Button title="Add" onPress={addToFirebase} />

                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: '75%',
        borderBottomColor: '#323232',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
        textAlign: "center",
        fontSize: 20,
        color: '#323232'
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    button: {
        width: '40%'
    },
});

export default InputItem;