import { StyleSheet, Text, View } from 'react-native'
import { Button } from "@react-native-material/core";
import React from 'react'
import {setUserLoggedIn,getUserLoggedIn} from '../utils/helper'

export default function Dashboard({navigation}) {

    const loggOut = () =>{
        setUserLoggedIn({})
        navigation.replace('LoginScreen')
    }
  return (
    <View>
      <Text>Dashboard</Text>
      <Button
                style={{ margin: 16 }}
                color="orange"
                onPress={()=>loggOut()}
                title="Logout"
              />
    </View>
  )
}

const styles = StyleSheet.create({})