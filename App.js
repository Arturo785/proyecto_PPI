import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView,StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage"
import Navigation from "./src/navigation/Navigation"
import Constants from "./src/utils/Constants"
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        getData().then((data) =>{
           // setUser(data)
           //console.log(" data de app : " + data)
           if(data === undefined){
               console.log("A logearse de nuevo")
           }
           else{
               console.log( "user" +data)
               setIsSignedIn(data)
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

    return (
        <PaperProvider>
            <NavigationContainer>
           

                <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
                <Navigation isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>
                                
            
     </NavigationContainer>
    </PaperProvider>
    )
}

const styles = StyleSheet.create({

})
