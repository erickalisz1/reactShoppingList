import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import firebase from 'firebase';

const InputItem = props => {

    const [enteredGoal, setEnteredGoal] = useState('');//empty string argument as default, function to change the text 

    //function in a function
    const goalInputHandler = (enteredText) => {//this JS syntax is identical to having a function
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');

        firebase.database().ref('shopping/').push(
            {
              itemName: enteredGoal,
              dateEntered: new Date().getDate()          
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
                    value={enteredGoal} />

                <View style={styles.buttons}>

                    <View style={styles.button} >

                        <Button title="Cancel" color="red" onPress={props.onCancel} />

                    </View>
                    <View style={styles.button} >

                        <Button title="Add" onPress={addGoalHandler} />
                        
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
        textAlign:"center",
        fontSize:20,
        color:'#323232'
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