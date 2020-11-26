import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text, IconButton} from 'react-native-paper';
import Constants from '../utils/Constants';
export default function Appointment(props) {

    const {allData, deleteAppointment, navigation, setRefresh, isAdmin} = props

    const onNavigation = () =>{
        if(!isAdmin){
            navigation.navigate(Constants.NAVIGATION_UPDATE, { allData, setRefresh })
        }
    }



    return (


        <View style={styles.container}>


                <View style={styles.innerContainer}>

                    <TouchableOpacity onPress={onNavigation}style={styles.innerContainer} >

                        <View style={styles.imageContainer}>

                            <Image style={styles.logo}  source={require("../assets/udg.png")}></Image>

                        </View>

                        <View style={styles.TextContainer}>
                            <Text style={styles.textDate}> Day: {allData.day} </Text>
                            <Text style={styles.textDate}> Hour: {allData.hour} </Text>
                            <Text style={styles.textDate}> Month: {allData.month} </Text>
                        </View>

                    </TouchableOpacity>

                    <View style={styles.iconContainer}>

                        <IconButton  icon="delete" title="Sign-out" size={30} style={{backgroundColor : "#214252"}} color={"#aa3a3a"}
                                onPress={() => deleteAppointment(allData)} 
                        />

                    </View>

                </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container : {
       // flex: 1,
        flexDirection: "column",
        width : "95%",
        backgroundColor : "#373a40",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30,

    },
    textDate : {
        fontSize : 15,
        fontWeight : "500",
        color : "#fff",
        paddingEnd : 15,
        marginTop : 5
    },
    TextContainer : {
        flexDirection : "column",
        alignItems : "center",
    },
    iconContainer :{
        flexDirection : "row",
        alignItems : "flex-end",
        paddingStart : 15,
    },
    innerContainer : {
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "center",
    },
    logo: {
        width: 70,
        height: 100,
        resizeMode: 'contain'
    },
    imageContainer : {
        flexDirection : "column",
        alignItems : "center",
        marginRight : 30
    }
})
