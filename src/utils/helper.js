import AsyncStorage from '@react-native-async-storage/async-storage';
// npx expo install @react-native-async-storage/async-storage

const setUserLoggedIn = async (value) => {
    try {
       await AsyncStorage.setItem('user', JSON.stringify(value))
      
    } catch (e) {
      // saving error
      console.log(e)
    }
  }



  const getUserLoggedIn = async (key) => {
    try {
        let useLoggedInValue = await AsyncStorage.getItem(key)
        
        if(useLoggedInValue) {
            
             return useLoggedInValue
        }    
      
    } catch (e) {
      // saving error
      console.log(e)
      return false
    }
  }


  export {setUserLoggedIn,getUserLoggedIn}