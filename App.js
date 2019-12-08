import React, { useState } from 'react';import firebase from 'firebase';
import { AppLoading } from 'expo';

import ShoppingItem from './ShoppingItem';//model class
import { firebaseConfig } from './assets/fireConfig';
import MainList from './MainList';

firebase.initializeApp(firebaseConfig);

let itemsList = [];

const fetchList = () => {
  let query = firebase.database().ref('shopping/').orderByKey();

  return query.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

      const item = new ShoppingItem();

      item.fireID = childSnapshot.key;
      item.itemName = childSnapshot.val().itemName;
      item.enteredDate = childSnapshot.val().enteredDate;
      item.isCompleted = childSnapshot.val().isCompleted;
      item.completedDate = childSnapshot.val().completedDate;

      itemsList.push(item);//populating our array of Model items
    });

  });
};

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);
  //this state will ensure that the app waits for the content to be fetched from Firebase

  if (!dataLoaded) 
  {
    return <AppLoading
      startAsync={fetchList}
      onFinish={() => { setDataLoaded(true) }}
      onError={(err) => console.log(err)} />;
  }

  return(
    <MainList firebaseList = {itemsList}/>
  );
}