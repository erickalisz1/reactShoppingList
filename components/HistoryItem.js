import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HistoryItem = props => {

    const { item } = props; //extracting prop

    return (

        <View style={styles.listItem} >
            <TouchableOpacity onLongPress={props.onDelete.bind(this, props.item)} >

                <Text style={styles.title}>{item.itemName}</Text>
                <Text style={styles.date}>Added at: {item.enteredDate}</Text>
                <Text style={styles.date}>Bought at {item.completedDate}</Text>

            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({

    listItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 2,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        marginVertical: 5
    },
    date: {
        textAlign: 'right',
    }

});

export default HistoryItem;