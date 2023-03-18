import { StyleSheet, Text, View,Button,Pressable} from 'react-native'
import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect,useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen({navigation,click,cancelPic}) {

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [profilePicUri, setProfilePicUri] = useState();

  requestPermission();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }


  const takePicture = async () => {
    let data = null;
    // console.log('cam>>',camera.current)
    try {
      const options = { quality: 0.5, base64: true };
       data = await cameraRef.current.takePictureAsync(options);
      // setProfilePicUri(data.uri);
      console.log('pic>>',data.uri)
    } catch (error) {
      console.log("ERROR >>>", error);
    }finally{
      click(data.uri)
    }
  };

  const cancelPicture = ()=>{
    cancelPic()
  }



  return (
    <View>
      <Camera type={type} ref={cameraRef}>
          <View style={{marginTop:0,height:'100%',justifyContent:'space-around', alignItems:"flex-end" ,flexDirection:'row'}}>
          <Pressable onPress={takePicture}>
            
          <Ionicons name="camera" size={46} color="white" 
          />
          </Pressable>

          <Pressable onPress={cancelPicture}>
            
          <Ionicons name="close-outline" size={46} color="red" 
          />
          </Pressable>

          </View>
        </Camera>
        
          
      {/* <Button title="go" onPress={()=>navigation.navigate('Home')}/> */}
    </View>
  )
}

const styles = StyleSheet.create({})