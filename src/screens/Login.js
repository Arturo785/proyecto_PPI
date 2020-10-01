import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Constants from "../utils/Constants"


export default function Login(props) {

    const {setIsSignedIn} = props

    const [code, setCode] = useState(null)
    const [nip, setNip] = useState(null)


    const getDataFromSIIAU = async () => {
        const route = `https://cuceimobile.tech/Escuela/datosudeg.php?codigo=${code}&nip=${nip}`

        // waits until the request completes...
        try {
            const response = await fetch(route,{
                method : "GET"
            });

            if(response.ok){
                console.log("200")
                const text = await response.text();
                return text
            }
            
            return null

        } catch (error) {
          console.error(error);
        }

      };

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem(Constants.USER_KEY, value)
          await AsyncStorage.setItem(Constants.USER_LOGGED_KEY, "true")
        } catch (e) {
          // saving error
        }
      }

    const logIn = () =>{
        console.log("picado")
        if(code && nip){
            getDataFromSIIAU().then(function(text){
                saveData(text)
            });
        }
        else{
            console.log("datos invalidos")
        }
    } 

    const saveData = (data) =>{
        if(data === "0"){
            console.log("no se pudo iniciar sesion")
        }
        else{
            storeData(data).then(() =>{
                setIsSignedIn(true)
            })
        }
    }

    return (
        <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         >
        
        <View style={styles.background}>

            <Image style={styles.logo} source={require("../assets/udg.png")}></Image>
        
            <TextInput
             style={[styles.input]}
             placeholder="Code"
             placeholderTextColor="#969696"
             onChange={e => setCode(e.nativeEvent.text)}
         />
         <TextInput
             style={[styles.input]}
             placeholder="NIP"
             placeholderTextColor="#969696"
             secureTextEntry={true}
             onChange={e => setNip(e.nativeEvent.text)}
         />
 
         <TouchableOpacity onPress={logIn} delayPressIn={0}>
             <Text style={styles.textButton}> Log-in  </Text>
         </TouchableOpacity>

         </View>

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    textButton :{
        color : "#fff",
        fontSize : 18,
        backgroundColor : "#1e3040",
        borderRadius : 5,
        height : 50,
        width : 80,
        textAlign : "center",
        textAlignVertical : "center"
    },
    input:{
        height : 50,
        color : "#fff",
        width : "80%",
        backgroundColor : "#1e3040",
        paddingHorizontal : 20,
        borderRadius : 20,
        fontSize : 18,
        borderWidth : 1,
        borderColor : "#1e3040",
    },
      register: {
     //   flex: 1,
       // justifyContent: 'flex-end',
        marginBottom: 40,
      },
      errorInput: {
        borderColor: '#940c0c',
      },
      background:{
        backgroundColor : "#15212b",
        height: "100%",
        alignItems : "center",
        justifyContent : "space-evenly",
    },
    logo: {
        width: 350,
        height: 300,
        resizeMode: 'contain'},
});
