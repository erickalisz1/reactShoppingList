import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListItem = props => {
    
    return (

        <View style={styles.listItem} >
            <Text>{props.item.itemName}</Text>
            
            <TouchableOpacity onPress={props.onDelete.bind(this, props.item)} >
                <View style={styles.icon}>
                    <Ionicons name='md-checkmark' size={20} color='#f66' />
                </View>
            </TouchableOpacity>
            
        </View>

    );
}

const styles = StyleSheet.create({

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 2,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems:'center'
    },
    icon:{
        padding:5//to make it easier to click
    }
});

export default ListItem;