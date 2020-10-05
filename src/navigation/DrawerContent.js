import React, {useState} from 'react';
import { View, StyleSheet, Image} from 'react-native';
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



export default function DrawerContent(props){

    const {setIsSignedIn, navigation} = props

    const [isActive, setIsActive] = useState("user")

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem(Constants.USER_KEY)
          await AsyncStorage.removeItem(Constants.USER_LOGGED_KEY)
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

    const signOut = () =>{
        removeValue().then(() =>{
            setIsSignedIn(false)
        }) 
    }


    const onChangeScreen = (screen) =>{
        setIsActive(screen)
        navigation.navigate(screen)
    }

    return(

        <DrawerContentScrollView {...props} style={styles.drawerContent}>

            <View style={styles.imageContainer}>    
                <Title style={styles.title}>Welcome!</Title>
                <Image style={styles.logo} source={require("../assets/udg.png")} />
            </View>


            <Drawer.Section>
                <Drawer.Item
                    label="User"
                    icon="home"
                    active={isActive === Constants.NAVIGATION_USER}
                    onPress={() => onChangeScreen(Constants.NAVIGATION_USER)}
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
    logoutSection :{
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : "150%",
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