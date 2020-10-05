import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import StackNavigation from "./StackNavigation"
import Constants from "../utils/Constants"
import {createDrawerNavigator} from "@react-navigation/drawer"
import DrawerContent from "../navigation/DrawerContent"


const stack = createStackNavigator()
const Drawer = createDrawerNavigator();


export default function Navigation(props){

    const {isSignedIn, setIsSignedIn} = props
   // console.log("props de navigation" + props)

    return (
        // if is signed in goes to one stack othewise goes to login
        isSignedIn ? (

            <Drawer.Navigator initialRouteName="app" drawerContent={(props) => <DrawerContent {...props} setIsSignedIn={setIsSignedIn}/>}
            >
                                
                <Drawer.Screen
                name="app"
                //component={UserStack}
                options={{title:"Home"}}
                >
                {(props) => <StackNavigation {...props} setIsSignedIn={setIsSignedIn} />} 
                </Drawer.Screen>
                 
            </Drawer.Navigator>

          ) : (
            <stack.Navigator>

              <stack.Screen
                name={Constants.NAVIGATION_LOGIN}
               // component={Login} the way below is a way to send props and also say which component to render
               options={{
                title: 'Login',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
                {(props) => <Login {...props} setIsSignedIn={setIsSignedIn} />} 
                
            </stack.Screen>

            </stack.Navigator>
          )
    )
}


