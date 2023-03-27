import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./signup";
import LoginScreen from './login'
import DashboardScreen from './dashboard'
const Stack = createNativeStackNavigator();

export default function Appnavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ title: "Signup", headerShown: false }}
        />

      <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login", headerShown: true }}
        />


        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "DashboardScreen", headerShown: true }}
        />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
