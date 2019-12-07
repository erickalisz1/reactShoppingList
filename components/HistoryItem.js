import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';TouchableOpacity

const HistoryItem = props => {

    const { item } = props; //extracting prop
    console.log(item);
    return (

        <View style={styles.listItem} >
            <Text>Shopping Item: {item.itemName}</Text>
            <Text>Entered at: {item.enteredDate}</Text>
            <Text>Completed at {item.completedDate}</Text>
            {/* <TouchableOpacity onPress={props.onDelete.bind(this, props.item)} >
                <Ionicons name='md-trash' size={20} color='#f66' />
            </TouchableOpacity> */}
        </View>

    );
}

const styles = StyleSheet.create({

    listItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 2,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems:'flex-start'
    },

});

export default HistoryItem;