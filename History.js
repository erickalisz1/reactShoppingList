import React from 'react';
import { View, Text, Button, StyleSheet, Modal, FlatList } from 'react-native';
import HistoryItem from './components/HistoryItem';
import PropTypes from "prop-types";

const History = (props) => {

    const {list} = props;

    //filtering data to display only not bought items

    // let filteredList = [];

    // list.forEach(element => {
    //     if (element.isCompleted === 1) {//if it has been completed
    //         // console.log(element);
    //         filteredList.push(element);//remove it
    //     }
        
    // });

    // updatedItems.forEach(element => {
    //     filteredList.push(element);
    // });

    if(props.visible === true) console.log(list);

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.screen}>

                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={item => item.fireID}
                        style={styles.list}
                        data={list.filter(item => item.isCompleted === 1)}
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

History.propTypes = {
    list: PropTypes.array.isRequired
  };

export default History;