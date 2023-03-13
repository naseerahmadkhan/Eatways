import {Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { styles } from '../theme/designSystem'
import { useFonts } from 'expo-font';
import { TextInput,Button  } from "@react-native-material/core";


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/auth/firebase'
 





export default function Home() {



  const [signupDetails,setSignupDetails ]= useState({
    email: '',
    pass:''
  })

  const [fontsLoaded] = useFonts({
    hotpizzaBold: require('../../assets/fonts/hotpizza.ttf'),
    KitschyRetroRegular: require('../../assets/fonts/KitschyRetroRegular.ttf'),
  });




  if (!fontsLoaded) {
    return null;
  }


  
  const handleSubmit = async (event) => {
    event.preventDefault();
   

createUserWithEmailAndPassword(auth, signupDetails.email, signupDetails.pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    // ..
  });


    // try {
    //   const userCredential = await firebase.auth().createUserWithEmailAndPassword('demo@example.com', 'Naseer@4201');
    //   console.log('User account created & signed in!', userCredential.user);
    // } catch (error) {
    //   console.error('Error creating user:', error);
    // }
  
    
    // try {
    //   await firebase.auth.signInWithEmailAndPassword('demo@example.com', 'Naseer@4201');
    //   console.log('Signed in successfully!');
    // } catch (error) {
    //   console.error('Error signing in:', error);
    // }
  };



  return (
    <View style={styles.container}>
      <Text style={{fontFamily:'KitschyRetroRegular', fontSize:20, alignSelf:'center'}}>Welcome <Text style={styles.typeography.ul}>to</Text> Signup</Text>
    
      <TextInput variant="standard" label="Email" style={{ margin: 16 }} 
      onChangeText={(val)=>setSignupDetails((prev)=>({...prev , email:val}))} />
      <TextInput variant="standard" label="Password" secureTextEntry={true} style={{ margin: 16 }} 
      onChangeText={(val)=>setSignupDetails((prev)=>({...prev , pass:val}))}/>
      <Button title="Send!" style={{ margin: 16 }} onPress={handleSubmit}/>


    </View>
  )
}

