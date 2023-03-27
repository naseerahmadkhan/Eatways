import {
  ScrollView,
  Text,
  View,
  Pressable,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { styles } from "../theme/designSystem";
import { useFonts } from "expo-font";
import { TextInput, Button } from "@react-native-material/core";
import { Avatar } from "@react-native-material/core";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



import { Formik } from "formik";
import * as Yup from "yup";
import validator from "validator";


import {setUserLoggedIn,getUserLoggedIn} from '../utils/helper'


export default function LoginScreen({ navigation, route }) {
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{

    (async function getUserSession(){
      try{
        const userStringifyResult = await getUserLoggedIn('user')
      let userObjectresult = JSON.parse(userStringifyResult)
      if(userObjectresult?.uid){
        navigation.replace('DashboardScreen')

      }

      }catch(err){
        console.log('error>>>',err)
        
      }finally{
        console.log('final')
        setIsLoading(false)
      }

      

    })()
    
  },[])

  const [fontsLoaded] = useFonts({
    hotpizzaBold: require("../../assets/fonts/hotpizza.ttf"),
    KitschyRetroRegular: require("../../assets/fonts/KitschyRetroRegular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const LoginSchema = Yup.object().shape({
   

    email: Yup.string()
      .email("Invalid email format")
      .required("Valid email is required")
      .test(
        "is-valid",
        (message) => `${message.path} is invalid`,
        (value) =>
          value
            ? validator.isEmail(value)
            : new Yup.ValidationError("Invalid value")
      ),

    password: Yup.string()
      // .min(8, 'Too Short!')
      .max(16, "Too Long!")
      .required("Valid password required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Use 8 or more characters with a mix of letters, numbers & symbols"
      ),
    // https://regexr.com/3bfsi

  
  });




  const handleSubmit = async(values) =>{
    
    try{
      const auth = getAuth();
    const authResult = await signInWithEmailAndPassword(auth, values.email, values.password)
    const uid = authResult.user.uid
    const email = authResult.user.email

    setUserLoggedIn({uid,email});
    let result = await getUserLoggedIn('user');
    if(result){

      navigation.replace("DashboardScreen")
    }

     


    }catch(err){
      console.log('err while uploading',err)
    }

   


  }

  const LoginView = <>
    <Text
          style={{
            fontFamily: "KitschyRetroRegular",
            fontSize: 20,
            alignSelf: "center",
            paddingVertical: 20,
          }}
        >
          Login
        </Text>

        

        <Formik
          initialValues={{
            email: "naseer@test.com",
            password: "#NASeer0987",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values)=>handleSubmit(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            isValidating,
          }) => (
            <View>
             

              <TextInput
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="E-mail"
              />

              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                placeholder="Password"
                secureTextEntry={true}
              />

              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.password}
                </Text>
              )}

             

              <Button
                style={{ margin: 16 }}
                color="orange"
                onPress={() => handleSubmit(values)}
                title="Sign In"
              />


                <Button
                style={{ margin: 16 }}
                color="green"
                title="Create an account"
                onPress={()=>navigation.replace('SignupScreen')}
                />


            </View>
          )}
        </Formik>
  </>



  return(
      <View style={styles.container}>
        {
          isLoading?
          (<Text style={{fontSize:50, alignSelf:'center'}}>Loading...</Text>):
          (LoginView)
        }


      </View>
  );


}
