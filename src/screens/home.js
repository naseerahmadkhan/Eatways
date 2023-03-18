import {ScrollView, Text, View,Pressable,Modal,StyleSheet,Image  } from 'react-native'
import React, { useState, useEffect,useRef } from 'react';
import { styles } from '../theme/designSystem'
import { useFonts } from 'expo-font';
import { TextInput,Button } from "@react-native-material/core";
import {Avatar} from "@react-native-material/core";


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../config/auth/firebase'
import { collection, addDoc } from "firebase/firestore"; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons"; 

import CameraScreen from './camerascreen';





export default function Home({navigation,route}) {


  const [showCamera,setShowCamera]=useState(false)

  const [modalVisible, setModalVisible] = useState(false);
  const [signupDetails,setSignupDetails ]= useState({
    fname:'',
    lname:'',
    email: '',
    pass:'',
    conf:'',
    pic:''
  })



  

  const [fontsLoaded] = useFonts({
    hotpizzaBold: require('../../assets/fonts/hotpizza.ttf'),
    KitschyRetroRegular: require('../../assets/fonts/KitschyRetroRegular.ttf'),
  });




  if (!fontsLoaded) {
    return null;
  }

  


  const takePic = (img)=>{
    if(img){
      setSignupDetails((prev)=>({...prev , pic:img}))
    }
    setShowCamera(false)
    setModalVisible(!modalVisible);

  }





  
  const handleSubmit = async (event) => {
    event.preventDefault();
   

createUserWithEmailAndPassword(auth, signupDetails.email, signupDetails.pass)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    try {
      const docRef = await addDoc(collection(db, "eatoos"), {
        first: signupDetails.fname,
        last: signupDetails.lname,
        email:signupDetails.email,
        uid:user.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log('user>>>>>>',user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    // ..
  });


  };

    let SignupPage = <ScrollView>
    <View style={styles.container}>
    <Text style={{fontFamily:'KitschyRetroRegular', fontSize:20, alignSelf:'center', paddingVertical:20}}>Welcome <Text style={styles.typeography.ul}>to</Text> Signup</Text>

    {/* <Avatar image={require("../../assets/icon.png")} size={64} /> */}
    <Pressable onPress={()=>setModalVisible(true)} >
      {
        signupDetails.pic !== ''?
        (<Avatar image={{uri:`${signupDetails.pic}`}} size={64} style={{alignSelf:'center'}} />):
        (<Avatar image={require('../../assets/images/profile.png')} size={64} style={{alignSelf:'center'}} />)
      } 
    
    </Pressable>
    <TextInput variant="standard" label="First Name" style={{ marginHorizontal:10, marginVertical:8 }} 
    onChangeText={(val)=>setSignupDetails((prev)=>({...prev , fname:val}))} />
    <TextInput variant="standard" label="Last Name" style={{ marginHorizontal:10, marginVertical:8 }} 
    onChangeText={(val)=>setSignupDetails((prev)=>({...prev , lname:val}))} />

    <TextInput variant="standard" label="Email" style={{ marginHorizontal:10, marginVertical:8 }} 
    onChangeText={(val)=>setSignupDetails((prev)=>({...prev , email:val}))} />
    <TextInput variant="standard" label="Password" secureTextEntry={true} style={{ marginHorizontal:10, marginVertical:8 }} 
    onChangeText={(val)=>setSignupDetails((prev)=>({...prev , pass:val}))}/>
    <TextInput variant="standard" label="Confirm Password" secureTextEntry={true} style={{ marginHorizontal:10, marginVertical:8 }} 
    onChangeText={(val)=>setSignupDetails((prev)=>({...prev , conf:val}))}/>
    <Button title="Register" style={{ margin: 16 }} onPress={handleSubmit}/>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
      
        <View style={styles.modalView}>
        <Pressable onPress={()=> setShowCamera(true)}>
        <Icon name="camera" size={64} color="green"  />
        </Pressable>
        <Icon name="view-gallery-outline" size={64} color="orange" />
        
          <Pressable
           
            onPress={() => setModalVisible(!modalVisible)}>
           <Icon name="close" size={64} />
          </Pressable>
         
        </View>
      </View>
    </Modal>

   


  </View>
 
  </ScrollView>

  if(showCamera ===true){
    return (<View style={{flex:1}}>
    <CameraScreen 
    click={(imgPath)=>takePic(imgPath)}
    cancelPic={()=>{setShowCamera(false); setModalVisible(!modalVisible) }}  
    />
    </View>)
  }else{

    return (SignupPage)
  }
  
 
}
