import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import User from "../screens/User"
import Constants from "../utils/Constants"
import {IconButton} from "react-native-paper"

const stack = createStackNavigator()

export default function StackNavigation(props) {

    const {setIsSignedIn,navigation} = props

    const buttonLeft = () =>{
        return(
            <IconButton
                icon="menu"
                onPress={() => navigation.openDrawer()}
            />
        )
    }

    return (
        <stack.Navigator>
            
                <stack.Screen
                    name= {Constants.NAVIGATION_USER}
                    options={{
                        title: 'User',
                        headerLeft: () => buttonLeft()
                    }}>

                    {(props) => <User {...props} setIsSignedIn={setIsSignedIn} />} 

                </stack.Screen>
                    
            </stack.Navigator>
    )
}
