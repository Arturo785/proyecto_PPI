import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import {getAllAppointmentsAPI} from "../api/ApiConnection"
import Appointment from '../components/Appointment'

export default function SeeDates() {

    useEffect(() => {
        const code = global.userLogged[1]
        getAllAppointmentsAPI(code).then((result) =>{
            console.log(result)
            setAllAppointments(result)
        })
    }, [])

    const [allAppointments, setAllAppointments] = useState([])



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
                    <Appointment allData={item} />
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
