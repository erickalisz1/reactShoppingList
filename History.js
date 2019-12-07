import React from 'react';
import { View, Text, Button, StyleSheet, Modal, FlatList } from 'react-native';
import HistoryItem from './components/HistoryItem';

const History = (props) => {

    const {list} = props;

    //filtering data to display only not bought items

    let filteredList = [];

    list.forEach(element => {
        if (element.isCompleted === 1) {//if it has been completed
            // console.log(element);
            filteredList.push(element);//remove it
        }
    });

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.screen}>

                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={item => item.fireID}
                        style={styles.list}
                        data={filteredList}
                        renderItem={itemData =>
                            (
                                <HistoryItem
                                    // onDelete={removeItemHandler}
                                    item={itemData.item} />
                            )} />
                </View>
                <View>
                    <Button onPress={props.onClose} title="Dismiss" />
                </View>

            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:25
    },
    listContainer: {
        flex: 1,
        margin: 20
    },
});

export default History;