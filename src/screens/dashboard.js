import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { setUserLoggedIn, getUserLoggedIn } from "../utils/helper";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../config/auth/firebase";

export default function Dashboard({ navigation }) {
  const [users, setUsers] = useState();



   const getDataFromDB = async()=>{
    const usersDataArray = [];
    const queryResultList = await getDocs(collection(db, "eatoos"));
    queryResultList.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      usersDataArray.push(doc.data());
    });

    setUsers(usersDataArray);
  }




  const getSingleData = async () => {
    console.log("single data");
    // give id and it will return from collection
    const docRef = doc(db, "eatoos", "JWex0JePQIg0f0IVAC0gisLOUNr2");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", (docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      alert("No such document!");
    }
  };


  useEffect(() => {
    // console.log('dashboard')
    getDataFromDB();

    
  }, []);

  const myRenderView = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: item.profileImageUrl }} style={{ height: 50 }} />
        <Text>uid: {item.uid}</Text>
        <Text>First Name: {item.fname}</Text>
        <Text>Last Name: {item.lname}</Text>
        <Text>Email: {item.email}</Text>
      </View>
    );
  };

  const loggOut = () => {
    setUserLoggedIn({});
    navigation.replace("LoginScreen");
  };
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text>Dashboard</Text>
      <Button
        style={{ margin: 16 }}
        color="orange"
        onPress={() => loggOut()}
        title="Logout"
      />

      <Text>Get all data from firebase</Text>
      <FlatList data={users} renderItem={myRenderView} />
      <Button title="Get signle item from DB" onPress={getSingleData} />
      <Button title="Open maps" color="green" onPress={()=>navigation.navigate('MapScreen')}/>
    </View>
  );
}

const styles = StyleSheet.create({});
