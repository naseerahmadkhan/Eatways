import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';



/* 
  ? two ways to do this , tutorials are as under
  * https://blog.openreplay.com/requesting-location-permission-in-react-native-apps/
  * https://docs.expo.dev/versions/v48.0.0/sdk/map-view/
  * https://docs.expo.dev/versions/latest/sdk/location/
*/

// ! Steps
// npx expo install react-native-maps
// expo install expo-location 
//  "permissions": ["ACCESS_BACKGROUND_LOCATION"] in app.json

// !documentation
// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md









export default function Map() {
  
  const [myLocation,setMyLocation] = useState({
    latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })

  


const getLocation = async() =>{
  
  let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setMyLocation(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      );

}

 

  useEffect(()=>{
    getLocation()
    
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
