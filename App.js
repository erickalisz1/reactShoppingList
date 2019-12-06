import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ShoppingItem from './ShoppingItem';//model class
import { firebaseConfig } from './assets/fireConfig';
import ListItem from './components/ListItem';
import InputItem from './components/InputItem';

firebase.initializeApp(firebaseConfig);

let itemsList = [];

const renderList = () => {
  let query = firebase.database().ref('shopping/').orderByKey();

  return query.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

      const item = new ShoppingItem();

      item.fireID = childSnapshot.key;
      item.itemName = childSnapshot.val().itemName;
      item.enteredDate = childSnapshot.val().enteredDate;
      item.isCompleted = childSnapshot.val().isCompleted;

      itemsList.push(item);
    });

  });
};

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);//empty array, which will grow as we press btn
  const [isAddMode, setIsAddMode] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    console.log('started at ' + new Date().getMilliseconds() + 'ms');
    console.log('finished at ' + new Date().getMilliseconds() + 'ms');
    return <AppLoading
      startAsync={renderList}
      onFinish={() => { setDataLoaded(true) }}
      onError={(err) => console.log(err)} />;
  }


  //onClick function
  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        value: goalTitle
      }
    ]);//... is called spread operator, native to JS. it creates a new array with the element you're adding at the end
    setIsAddMode(false);
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
      console.log('DELETED !');
    }).catch((error) => {
      console.log(error);
    });;
  }

  const cancelGoal = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen} >

      <InputItem visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoal} />

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

      <TouchableOpacity style={styles.refreshContainer}>
        <View style={styles.refreshContainer}>
          <Text style={styles.textR}>Refresh</Text>
          <Ionicons name='md-refresh' size={32} color='white' />
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => setIsAddMode(true)} style={styles.buttonContainer} >
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
    marginVertical: 10
  },
  text: {
    fontSize: 20
  },
  textR: {
    fontSize: 20,
    color: 'white'
  }
});
