import { StyleSheet} from 'react-native';
//! https://colorhunt.co/palette/f7f1e5e7b10a8981214c4b16
const styles = StyleSheet.create({

    safearea:{
        flex:1    
    },
    colors:{
        primary:'#E7B10A',
        secondary:'#898121',
        dark:'#4C4B16',
        accent:'#F7F1E5',
    },
    container :{
        paddingHorizontal:10, 
        paddingVertical:10,
        marginVertical:10
        
    },
    typeography:{
        ul:{
            textDecorationLine: 'underline',
           
        }
    },
    centeredView: {
        flex: 1,
        justifyContent:"flex-end",
        alignItems:"flex-end",
        marginTop: 22,
      },
      modalView: {
        backgroundColor: 'white',
        flex:0,
        flexDirection:'row',
        borderRadius: 10,
        padding: 53,
        alignItems:"center",
        justifyContent:"space-between",
        shadowColor: '#000',
        width:'100%',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 0,
      },
      
     
     
     
})


export {styles}