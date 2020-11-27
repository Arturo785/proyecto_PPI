import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Constants from "../utils/Constants"
import { Button, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login(props) {

    const {setIsSignedIn, navigation} = props

    const [code, setCode] = useState(null)
    const [nip, setNip] = useState(null)
    const [errorCode, setErrorCode] = useState(false)
    const [errorNip, setErrorNip] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [invalidData, setInvalidData] = useState(false)



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

      const navigateToAdmin = () => {
        navigation.navigate(Constants.NAVIGATION_LOGIN_ADMIN)
      }

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem(Constants.USER_KEY, value)
          await AsyncStorage.setItem(Constants.USER_LOGGED_KEY, "true")
        } catch (e) {
          // saving error
        }
      }

    const logIn = () =>{
        setErrorNip(false)
        setErrorCode(false)
        setIsLoading(true)
        setInvalidData(false)

        console.log("picado")
        if(code && nip){
            getDataFromSIIAU().then(function(text){
                setIsLoading(false)
                saveData(text)
            });
        }
        else{
            if(!code){
                setErrorCode(true)
            }
            if(!nip){
                setErrorNip(true)
            }
            setIsLoading(false)
            console.log("datos invalidos")
        }
    } 

    const saveData = (data) =>{
        if(data === "0"){
            console.log("no se pudo iniciar sesion")
            setInvalidData(true)
        }
        else{
            storeData(data).then(() =>{
                setIsSignedIn(true)
            })
        }
    }

    return (
        <ScrollView>


        
        <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         >
        
        <View style={styles.background}>

            <Image style={styles.logo} source={require("../assets/udg.png")}></Image>


            <View style={styles.containerInputs}>
        
            <TextInput
                mode="outlined"
                placeholder="Code"
                style={styles.custom}
                onChange={e => setCode(e.nativeEvent.text)}
                >
            </TextInput>
            <HelperText 
                    visible={errorCode}
                    type="error" 
                >
                    Please enter some data
            </HelperText>

            <TextInput
                mode="outlined"
                placeholder="NIP"
                style={styles.custom}
                secureTextEntry={true}
                onChange={e => setNip(e.nativeEvent.text)}
                >
            </TextInput>

            <HelperText 
                    visible={errorNip}
                    type="error" 
                >
                    Please enter some data
            </HelperText>

            </View>
 

          <Button 
            mode="outlined"
            onPress={logIn}
            marginTop={60}
            loading={isLoading}
            >
            Log-in
          </Button>
          <HelperText 
                    visible={invalidData}
                    type="error" 
                >
                    Invalid data
            </HelperText>

            <Button 
                mode="text"
                onPress={navigateToAdmin}
            >
            Admin
          </Button>

         </View>

        </KeyboardAvoidingView>
        </ScrollView>
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
        //backgroundColor : "#15212b",
        height: "100%",
        alignItems : "center",
        //justifyContent : "space-evenly",
    },
    logo: {
        width: 350,
        height: 300,
        marginTop : 20,
        marginBottom : 10,
        resizeMode: 'contain'},
    custom :{
        backgroundColor : "#222831",
        width : "70%",   
    },
    containerInputs:{
     //   backgroundColor : "#15212b",
        height: "25%",
        width : "100%",
        alignItems : "center",
        justifyContent : "space-evenly",
    },
});
