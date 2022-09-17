import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './Navigators/StackNavigator';

export default function App(){

  return(
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  )

}