import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native'
import { Button, TextInput, HelperText } from 'react-native-paper';
import {createAdminAPI} from "../api/ApiConnection"
import Toast from 'react-native-simple-toast';
import RNPickerSelect from "react-native-picker-select"

export default function CreateAdmin(props) {


    const {navigation} = props

    const [code, setCode] = useState(null)
    const [nip, setNip] = useState(null)
    const [errorCode, setErrorCode] = useState(false)
    const [errorNip, setErrorNip] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [invalidData, setInvalidData] = useState(false)

    const [career, setcareer] = useState(null)
    const [errorCareer, setErrorCareer] = useState(false)

    const logIn = () =>{
        setErrorNip(false)
        setErrorCode(false)
        setIsLoading(true)
        setInvalidData(false)

        console.log("picado")
        if(code && nip && career){

            const form = new FormData();
            form.append('username', code);
            form.append('password', nip);
            form.append('isAdmin', 1);
            form.append('career', career);
            //Do request
            createAdminAPI(form).then(response =>{
                console.log(response)
                if(response === 1){
                    Toast.show('Admin created.', Toast.LONG); 
                    navigation.goBack()
                }
                else{
                    Toast.show('Username unavailable.', Toast.LONG);
                }
                setIsLoading(false)
            })


        }
        else{
            if(!code){
                setErrorCode(true)
            }
            if(!nip){
                setErrorNip(true)
            }
            if(!career){
                setErrorCareer(true)
            }

            setIsLoading(false)
            console.log("datos invalidos")
        }
    }

    return (

        <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         >
        
        <View style={styles.background}>

            <Image style={styles.logo} source={require("../assets/udg.png")}></Image>


            <View style={styles.containerInputs}>
        
            <TextInput
                mode="outlined"
                placeholder="Username"
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
                placeholder="Password"
                style={styles.custom}
                secureTextEntry={true}
                maxLength={12}
                onChange={e => setNip(e.nativeEvent.text)}
                >
            </TextInput>

            <HelperText 
                    visible={errorNip}
                    type="error" 
                >
                    Please enter some data
            </HelperText>

            <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setcareer(value)}

                    placeholder={{
                        label:"Career",
                        value: null
                    }}

                    items={[
                    {label: "COM" , value: "COM"},
                    {label: 'INNI', value: "INNI"},
                    {label: 'QFB', value: "QFB"},
                    ]}
                />

                <HelperText 
                    visible={errorCareer}
                    type="error" 
                >
                    Please enter some data
            </HelperText>

            </View>
 

          <Button 
            mode="outlined"
            marginTop={60}
            loading={isLoading}
            onPress={logIn}
            >
            Create
          </Button>
          <HelperText 
                    visible={invalidData}
                    type="error" 
                >
                    Invalid data
            </HelperText>


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
        //backgroundColor : "#15212b",
        height: "100%",
        alignItems : "center",
        //justifyContent : "space-evenly",
    },
    logo: {
        width: 250,
        height: 200,
        marginTop : 20,
        marginBottom : 10,
        resizeMode: 'contain'},
    custom :{
        backgroundColor : "#222831",
        width : "70%",   
        margin: 20
    },
    containerInputs:{
     //   backgroundColor : "#15212b",
        height: "25%",
        width : "100%",
        alignItems : "center",
        justifyContent : "space-evenly",
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS:{
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        color: "#fff",
        paddingRight: 30,
        backgroundColor: "#0f4c75",
        width : 150,
        marginLeft: -5,
        marginRight: -5,
        marginTop : 20,
        marginBottom : 20,
        marginEnd : 5,

    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 8,
        color: '#fff',
        width : 150,
        backgroundColor: '#0f4c75',
        marginTop : 20,
        marginBottom : 20,
        marginEnd : 5,
      },
});
