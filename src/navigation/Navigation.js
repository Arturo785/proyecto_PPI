import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import User from "../screens/User"
import Constants from "../utils/Constants"

const stack = createStackNavigator()


export default function Navigation(props){

    const {isSignedIn, setIsSignedIn} = props
   // console.log("props de navigation" + props)

    return (
        // if is signed in goes to one stack othewise goes to login
        isSignedIn ? (
            <stack.Navigator>

            <stack.Screen
                name= {Constants.NAVIGATION_USER}
                //component={User}
                options={{
                    title: 'User',
                    headerStyle: {
                      backgroundColor: '#407088',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}>

                {(props) => <User {...props} setIsSignedIn={setIsSignedIn} />} 

            </stack.Screen>
                
            </stack.Navigator>
          ) : (
            <stack.Navigator>

              <stack.Screen
                name={Constants.NAVIGATION_LOGIN}
               // component={Login} the way below is a way to send props and also say which component to render
               options={{
                title: 'Login',
                headerStyle: {
                  backgroundColor: '#407088',
                },
                headerTintColor: '#fff',
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
