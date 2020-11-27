import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import LoginAdmin from "../screens/LoginAdmin"
import CreateAdmin from "../screens/CreateAdmin"
import StackNavigation from "./StackNavigation"
import Constants from "../utils/Constants"
import {createDrawerNavigator} from "@react-navigation/drawer"
import DrawerContent from "../navigation/DrawerContent"
import StackNavigatorAdmin from './StackNavigatorAdmin'
import DrawerContentAdmin from './DrawerContentAdmin'


const stack = createStackNavigator()
const Drawer = createDrawerNavigator();


export default function Navigation(props){

    const {isSignedIn, setIsSignedIn, isAdmin, setIsAdmin} = props
   // console.log("props de navigation" + props)
   console.log(isSignedIn)

    return (
        // if is signed in goes to one stack othewise goes to login
        isSignedIn ? (

            !isAdmin ? (

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

            ) :
            (
                <Drawer.Navigator initialRouteName="app" drawerContent={(props) => <DrawerContentAdmin {...props} setIsAdmin={setIsAdmin} setIsSignedIn={setIsSignedIn}/>}
                >
                                    
                    <Drawer.Screen
                    name="app_admin"
                    //component={UserStack}
                    options={{title:"Home admin"}}
                    >
                    {(props) => <StackNavigatorAdmin {...props} />} 
                    </Drawer.Screen>
                     
                </Drawer.Navigator> 
            )

            

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

            <stack.Screen
                name={Constants.NAVIGATION_LOGIN_ADMIN}
               // component={Login} the way below is a way to send props and also say which component to render
               options={{
                title: 'Login admin',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
                {(props) => <LoginAdmin {...props} setIsSignedIn={setIsSignedIn} setIsAdmin={setIsAdmin} />} 
                
            </stack.Screen>

            <stack.Screen
                    name= {Constants.CREATE_ADMIN}
                    component = {CreateAdmin}
                    options={{
                        title: 'Create Admin',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                          },
                    }}>

                </stack.Screen>

            </stack.Navigator>
          )
    )
}


