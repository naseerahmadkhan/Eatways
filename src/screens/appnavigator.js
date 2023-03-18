import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import CameraScreen from "./camerascreen";
const Stack = createNativeStackNavigator();

export default function Appnavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />

        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Camera", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
