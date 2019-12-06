import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';//reactnavigation.org

import MainList from "../MainList";
import History from "../History";

const Navigator = createStackNavigator({
    MainScreen:{ screen : props => <MainList {...props} /> }, //first screen
    PreviousItems:History //second screen
});

export default createAppContainer(Navigator);