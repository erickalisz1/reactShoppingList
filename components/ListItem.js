import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListItem = props => {
    
    return (

        <View style={styles.listItem} >
            <Text>{props.title}</Text>
            <TouchableOpacity onPress={props.onDelete.bind(this, props.id)} >
                <Ionicons name='md-backspace' size={20} color='#f44' />
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

});

export default ListItem;