import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, NativeModules} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView, DrawerItemList
} from '@react-navigation/drawer';
import {
  Title,
  Drawer,IconButton,Text
} from 'react-native-paper';

import Constants from "../utils/Constants"
import AsyncStorage from "@react-native-community/async-storage"



export default function DrawerContentAdmin(props){

    const {setIsAdmin, navigation,setIsSignedIn} = props


    const [user, setUser] = useState("")
    const [isActive, setIsActive] = useState("user")

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem(Constants.USER_KEY)
          await AsyncStorage.removeItem(Constants.USER_LOGGED_KEY)
          await AsyncStorage.removeItem(Constants.USER_LOGGED_ADMIN_KEY)
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

    const signOut = () =>{
        removeValue().then(() =>{
            setIsSignedIn(false)
            setIsAdmin(false)
            NativeModules.DevSettings.reload();
        }) 
    }


    const getData = async () => {
        try {
         const value = await AsyncStorage.getItem(Constants.USER_KEY)
          if(value !== null) {
          //  console.log("Se recupero")
            global.userLogged = value
            return value
          }
        } catch(e) {
          console.log("no se pudo")
        }
      }


    const onChangeScreen = (screen) =>{
        setIsActive(screen)
        navigation.navigate(screen)
    }

    useEffect(() => {

        getData().then((response) =>{
            setUser(response)
        })
        
    }, [])

    return(

        <DrawerContentScrollView {...props} style={styles.drawerContent}>

            <View style={styles.imageContainer}> 

            <Title style={styles.title}>Welcome!</Title>
            
            {user !== "" ?
                <> 
                    <Text style={styles.SubTitle}>{user}</Text>
                </>
                :
                <Text style={styles.SubTitle}>Something went wrong</Text>
            }
        
                <Image style={styles.logo} source={require("../assets/udg.png")} />

            </View>


            <Drawer.Section>

                <Drawer.Item
                    label="Home"
                    icon="home"
                    active={isActive === Constants.NAVIGATION_ADMIN}
                    onPress={() => onChangeScreen(Constants.NAVIGATION_ADMIN)}
                />


            </Drawer.Section>

            <View style={styles.logoutSection}>
                <Text style={styles.logoutText}>Log-Out</Text>
                <IconButton  icon="power" title="Sign-out" size={30}
                    onPress={signOut}
                />
            </View>
            
        
        </DrawerContentScrollView>
    );

}


const styles = StyleSheet.create({
    title: {
      marginTop: 20,
      fontWeight: 'bold',
      color : "#fff",
      marginBottom : 10,
      marginStart : 5,
    },
    SubTitle :{
        color : "#fff",
        fontSize : 12,
    },
    logoutSection :{
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : "30%",
    },
    logoutText :{
        fontWeight: 'bold',
        color : "#b83b5e",
        fontSize : 18,
    },
    logo: {
        width: 70,
        height: 100,
        marginTop : 10,
        marginBottom : 10,
        resizeMode: 'contain'},
        
    imageContainer : {
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "center",
    },

  });