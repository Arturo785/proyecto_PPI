import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView,StatusBar} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Navigation from "./src/navigation/Navigation"
import Constants from "./src/utils/Constants"
import { Provider as PaperProvider } from 'react-native-paper';

import {DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from "react-native-paper"
import {NavigationContainer,DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation} from "@react-navigation/native"


DarkThemePaper.colors.primary = "#1ae1f2"
DarkThemePaper.colors.accent = "#c62a88"

DarkThemeNavigation.colors.background = "#192734"
DarkThemeNavigation.colors.card = "#1b2134"

export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        getData().then((data) =>{
           // setUser(data)
           //console.log(" data de app : " + data)
           if(data === undefined){
               console.log("A logearse de nuevo")
           }
           else{
               console.log( "user" +data)
                getDataAdmin().then(adminData =>{
                    setIsAdmin(adminData)
                    setIsSignedIn(data)
                })  
               
           }
        })
    }, [])

    const getData = async () => {
        try {
         const value = await AsyncStorage.getItem(Constants.USER_LOGGED_KEY)
          if(value !== null) {
            // value previously stored
            return value
          }
        } catch(e) {
          console.log("no se pudo")
        }
      }

      const getDataAdmin = async () => {
        try {
         const value = await AsyncStorage.getItem(Constants.USER_LOGGED_ADMIN_KEY)
          if(value !== null) {
            // value previously stored
            return value
          }
        } catch(e) {
          console.log("no se pudo admin")
        }
      }

    return (
        <PaperProvider theme={DarkThemePaper}>
            <NavigationContainer theme={DarkThemeNavigation}>
                <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
                <Navigation isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
     </NavigationContainer>
    </PaperProvider>
    )
}

const styles = StyleSheet.create({

})
