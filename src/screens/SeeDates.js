import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Title,} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import {getAllAppointmentsAPI, deleteAppointmentAPI} from "../api/ApiConnection"
import Appointment from '../components/Appointment'
import Toast from 'react-native-simple-toast';

export default function SeeDates(props) {

    const {navigation} = props

    

    useEffect(() => {
        const code = global.userLogged[1]
        getAllAppointmentsAPI(code).then((result) =>{
          //  console.log(result)
            setAllAppointments(result)
        })
    }, [])

    const [allAppointments, setAllAppointments] = useState([])
    const [refresh, setRefresh] = useState(false)


    const deleteFromResults = (dataToDelete) => {
        const oldData = allAppointments
        const newData = oldData.filter(item => item !== dataToDelete);

        setAllAppointments(newData)
    }

    const myTest = (oldOne,newData) => {
        const code = global.userLogged[1]
        getAllAppointmentsAPI(code).then((result) =>{
          //  console.log(result)
            setAllAppointments(result)
            console.log("refresehd")
        })
    }


    const deleteAppointment = (appointmentData) =>{

        Alert.alert(
            "Delete appointment",
            `Are you sure you want to delete the appointment? this action can't be undone`,
            [
              {
                text: "Cancel", 
                style: 'cancel'
              },
              {
                  text: "Delete",
                  style: "destructive",
                  onPress: () =>{

                    deleteAppointmentAPI(appointmentData).then((result) =>{
                        if(result === 1){
                            Toast.show('Appointment deleted.', Toast.LONG);
                            deleteFromResults(appointmentData)
                        }
                        else{
                            Toast.show('Something went wrong', Toast.LONG);
                        }
                    })
                  }
              }
          ],
          {cancelable: true},
        );

    }



    return (
        <SafeAreaView style={{flex : 1,}}>

            <Title style={styles.titleStyle}> All appointments</Title>
            
            <FlatList 
                data={allAppointments}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.month}${item.day}${item.hour}`}
                contentContainerStyle={{ paddingTop : 20, marginStart : 10, paddingBottom : 20 }}
                ItemSeparatorComponent={() => <Text> ‧ </Text>}

                renderItem={({item}) => (
                    <Appointment allData={item} deleteAppointment={deleteAppointment} navigation={navigation} setRefresh={myTest} />
                )}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleStyle : {
        paddingStart : 20
    }
})
