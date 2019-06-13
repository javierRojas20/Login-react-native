/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//import { StackNavigator } from 'react-navigation';
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './app/Login';
import Olvidaste from './app/Olvidaste';

import Perfil from './app/Profile';

const AppNavigator = createStackNavigator(
  {
  Home: { screen: Login },
  Cambiar: { screen: Olvidaste },
  Profile: { screen: Perfil }
},
{
  initialRouteName: "Home"
}

);


let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return(
      <Navigation />
    )
    
  }
}