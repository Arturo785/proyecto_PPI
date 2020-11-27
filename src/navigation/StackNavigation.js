import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import User from "../screens/User"
import SeeDates from "../screens/SeeDates"
import UpdateDates from "../screens/UpdateDates"
import Constants from "../utils/Constants"
import {IconButton} from "react-native-paper"

const stack = createStackNavigator()

export default function StackNavigation(props) {

    const {setIsSignedIn,navigation} = props

    const buttonLeft = (screen) =>{

        switch(screen){

            case Constants.NAVIGATION_UPDATE:
                return(
                    <IconButton 
                        icon="arrow-left"
                        onPress={() => navigation.goBack()}
                    />
                )

            default:
                return(
                    <IconButton
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                )
        }

    }

    return (
        <stack.Navigator>
            
                <stack.Screen
                    name= {Constants.NAVIGATION_USER}
                    options={{
                        title: 'User',
                        headerLeft: () => buttonLeft(Constants.NAVIGATION_USER)
                    }}>

                    {(props) => <User {...props} setIsSignedIn={setIsSignedIn} />} 

                </stack.Screen>


                <stack.Screen 
                    name={Constants.NAVIGATION_DATES}
                    component={SeeDates}
                    options={
                        {title:"Dates",
                        headerLeft: () => buttonLeft(Constants.NAVIGATION_DATES),
                        }
                    }
                />

                <stack.Screen 
                    name={Constants.NAVIGATION_UPDATE}
                    component={UpdateDates}
                    options={
                        {title:"Update",
                        headerLeft: () => buttonLeft(Constants.NAVIGATION_UPDATE),
                        }
                    }
                />
                    
            </stack.Navigator>
    )
}
