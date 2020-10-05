import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Constants from "../utils/Constants"
import { Button } from 'react-native-paper';

export default function User(props) {

    const {setIsSignedIn} = props


    const [user, setUser] = useState(null)

    useEffect(() => {

        getData().then((response) =>{
            setUser(response)
        })
        
    }, [])



    const getData = async () => {
        try {
         const value = await AsyncStorage.getItem(Constants.USER_KEY)
          if(value !== null) {
          //  console.log("Se recupero")
            const splitValue = value.split(",")
            return splitValue
          }
        } catch(e) {
          console.log("no se pudo")
        }
      }


    return (
        <View style={styles.background}>

            {user 
            ?
            <Text style={styles.welcomeText}> Welcome : {"\n"} {user[2]}  </Text>
            :
            <Text style={styles.welcomeText}>Error inesperado</Text>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    background:{
      //  backgroundColor : "#15212b",
        height: "100%",
        alignItems : "center",
    },
    welcomeText :{
        fontSize : 20,
        color : "#fff",
        paddingTop : 20,
    },
    textButton :{
        color : "#fff",
        fontSize : 18,
        backgroundColor : "#1e3040",
        borderRadius : 5,
        height : 50,
        width : 80,
        textAlign : "center",
        textAlignVertical : "center",
        marginTop : 20,
    },
})
