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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db,storage } from "../config/auth/firebase";
import { collection, addDoc, doc, setDoc  } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import CameraScreen from "./camerascreen";

import {uriToBlob} from '../utils/uritoblob'

import { Formik} from "formik";
import * as Yup from "yup";
import validator from 'validator';


export default function Home({ navigation, route }) {
  const [showCamera, setShowCamera] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    conf: "",
    pic: "",
  });

  const [fontsLoaded] = useFonts({
    hotpizzaBold: require("../../assets/fonts/hotpizza.ttf"),
    KitschyRetroRegular: require("../../assets/fonts/KitschyRetroRegular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(5, 'Too Long!')
      .required('Valid first name is required'),


      lname: Yup.string()
      .min(2, 'Too Short!')
      .max(5, 'Too Long!')
      .required('Valid last name is required'),  


    email: Yup
      .string()      
      .email("Invalid email format")
      .required("Valid email is required")
      .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? validator.isEmail(value) : new Yup.ValidationError("Invalid value")),

      password: Yup.string()
      // .min(8, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Valid password required')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Use 8 or more characters with a mix of letters, numbers & symbols'),
      // https://regexr.com/3bfsi

      confirm: Yup.string()
      .required('Confirm password required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),

      


  });



  const takePic = (img) => {
    if (img) {
      uriToBlob(img)
      .then((blobReponse) => {
        console.log('blob resp',blobReponse)

        //--------
        const filename = `naseerpic.jpg`;
        const fileRef = ref(storage, filename);
        uploadBytes(fileRef, blobReponse)
          .then((uploadResponse) => {
            console.log('uploaded response',uploadResponse)
          })
          .catch((uploadError) => {
            alert(uploadError.message);
            setLoading(false);
          });

        //--------
      })
      .catch((blobError)=>{
        console.log('blob error',blobError)
      })
      setSignupDetails((prev) => ({ ...prev, pic: img }));
    }
    setShowCamera(false);
    setModalVisible(!modalVisible);
  };


  

  const handleUpload = async (data) => {
    
    console.log('data',data)
    
    createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        try {
          /* 
          ! add data in collection eatoos in database
          const docRef = await addDoc(collection(db, "eatoos"), {  


            Add a new document in collection "cities"
            await setDoc(doc(db, "collectionName", "customDocID"), {

            */

              let formData = {
                first: data.fname,
                last: data.lname,
                email: data.email,
                uid: user.uid,
              }
          await setDoc(doc(db, "eatoos",user.uid),formData )
          .then((e)=>{
              console.log('success')
          })
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  const handleSubmitForm = (values) =>{

    let formData = {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      password: values.password,
      pic:"https://profile-url-path"
    }
    handleUpload(formData)
  }
  const SignupPage = (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "KitschyRetroRegular",
            fontSize: 20,
            alignSelf: "center",
            paddingVertical: 20,
          }}
        >
          Welcome <Text style={styles.typeography.ul}>to</Text> Signup
        </Text>

        {/* <Avatar image={require("../../assets/icon.png")} size={64} /> */}
        <Pressable onPress={() => setModalVisible(true)}>
          {signupDetails.pic !== "" ? (
            <Avatar
              image={{ uri: `${signupDetails.pic}` }}
              size={64}
              style={{ alignSelf: "center" }}
            />
          ) : (
            <Avatar
              image={require("../../assets/images/profile.png")}
              size={64}
              style={{ alignSelf: "center" }}
            />
          )}
        </Pressable>
        {/* -------------------- */}
       

<Formik
        initialValues={{ fname:"",lname:"",email: "",password:"",confirm:""}}
        validationSchema={SignupSchema}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValidating,
        }) => (
          <View>

          <TextInput
              value={values.fname}
              onChangeText={handleChange("fname")}
              onBlur={() => setFieldTouched("fname")}
              placeholder="First Name"
              validationSchema={SignupSchema}
            />

            {touched.fname && errors.fname && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.fname}
              </Text>
            )}


            <TextInput
              value={values.lname}
              onChangeText={handleChange("lname")}
              onBlur={() => setFieldTouched("lname")}
              placeholder="Last Name"
              validationSchema={SignupSchema}
            />

            {touched.lname && errors.lname && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.lname}
              </Text>
            )}




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


            <TextInput
              value={values.confirm}
              onChangeText={handleChange("confirm")}
              onBlur={() => setFieldTouched("confirm")}
              placeholder="Confirm password..."
              secureTextEntry={true}
            />

            {touched.confirm && errors.confirm && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.confirm}
              </Text>
            )}





            <Button style={{ margin: 16 }} onPress={()=>handleSubmitForm(values)} title="Submit!" />
          </View>
        )}
      </Formik>

        {/* ----------------- */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={() => setShowCamera(true)}>
                <Icon name="camera" size={64} color="green" />
              </Pressable>
              <Icon name="view-gallery-outline" size={64} color="orange" />

              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="close" size={64} />
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );

  if (showCamera === true) {
    return (
      <View style={{ flex: 1 }}>
        <CameraScreen
          click={(imgPath) => takePic(imgPath)}
          cancelPic={() => {
            setShowCamera(false);
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    );
  } else {
    return SignupPage;
  }
}
