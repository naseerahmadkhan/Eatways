import { StatusBar } from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import Appnavigator from './src/screens/appnavigator';
import { AppBar } from "@react-native-material/core";
import { styles } from './src/theme/designSystem'
import { useFonts } from 'expo-font';
export default function App() {

  const [fontsLoaded] = useFonts({
    hotpizzaBold: require('./assets/fonts/hotpizza.ttf'),
    KitschyRetroRegular: require('./assets/fonts/KitschyRetroRegular.ttf'),
  });




  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={styles.safearea}>
    {/* <AppBar 
    title="Eatoos" 
    titleStyle={{fontFamily:'hotpizzaBold'}}
    centerTitle={true} 
    color={styles.colors.primary} 
    style={{paddingTop:20}} 

    /> */}
    <Appnavigator/>
    </SafeAreaView>
  )
}

