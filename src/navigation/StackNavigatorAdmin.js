import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import ManagementAdmin from "../screens/ManagementAdmin"
import Constants from "../utils/Constants"
import {IconButton} from "react-native-paper"

const stack = createStackNavigator()

export default function StackNavigatorAdmin(props) {

    const {navigation} = props

    const buttonLeft = (screen) =>{

        switch(screen){

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
                    name={Constants.NAVIGATION_ADMIN}
                    component={ManagementAdmin}
                    options={
                        {title:"Admin",
                        headerLeft: () => buttonLeft(Constants.NAVIGATION_ADMIN),
                        }
                    }
                />

                    
            </stack.Navigator>
    )
}
