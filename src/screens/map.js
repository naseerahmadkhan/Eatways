import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";


/* 
  ? whole article follow here
  * https://blog.openreplay.com/requesting-location-permission-in-react-native-apps/
*/

// npx expo install react-native-maps
// expo install expo-location 
// expo install expo-task-manager

// !documentation
// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md









export default function Map() {
  
  const LOCATION_TASK_NAME = "background-location-task";
  const [myLocation,setMyLocation] = useState({
    latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })

  


const getLocation = () =>{
  
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      // Extract location coordinates from data
      const { locations } = data;
      const location = locations[0];
      if (location) {
        // Do something with captured location coordinates

        console.log('location>>',location)
        setMyLocation({
          latitude: location.coords.latitude,
          longitude:location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        

        })
        // setMyLocation(location)
      }
    }
  });

}

const requestForegroundAndBackgroundPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status == "granted") {
   await Location.requestBackgroundPermissionsAsync();
  
   await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //Location Task Options
    });

    getLocation();
    
    
  }
};
 

  useEffect(()=>{
    requestForegroundAndBackgroundPermission()
    
  },[])

  

  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      maptype="standard"
      zoomEnabled={true}
      zoomControlEnabled={true}
      showsUserLocation={true}
      region={myLocation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
