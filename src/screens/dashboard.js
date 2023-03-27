import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { setUserLoggedIn, getUserLoggedIn } from "../utils/helper";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../config/auth/firebase";

export default function Dashboard({ navigation }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    // console.log('dashboard')

    (async function getDataFromDB() {
      const usersDataArray = [];
      const queryResultList = await getDocs(collection(db, "eatoos"));
      queryResultList.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        usersDataArray.push(doc.data());
      });

      setUsers(usersDataArray);
    })();
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
      <FlatList data={users} renderItem={myRenderView} />
    </View>
  );
}

const styles = StyleSheet.create({});
