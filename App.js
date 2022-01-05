// * Description: App Entry Point

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import Router from './app/router'
import store from './app/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}