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
      item.completedDate = childSnapshot.val().isCompleted;

      itemsList.push(item);
    });

  });
};

export default function App() {

  
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) 
  {
    console.log('started at ' + new Date().getMilliseconds() + 'ms');
    console.log('finished at ' + new Date().getMilliseconds() + 'ms');

    return <AppLoading
      startAsync={fetchList}
      onFinish={() => { setDataLoaded(true) }}
      onError={(err) => console.log(err)} />;
  }

  return(
    <MainList itemsList = {itemsList}/>
  );
}

