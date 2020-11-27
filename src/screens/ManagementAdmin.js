import React, {useState, useEffect}from 'react'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Title, Button} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {getAllAppointmentsAdminAPI, deleteAppointmentAdminAPI} from "../api/ApiConnection"
import Appointment from '../components/Appointment'
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-community/async-storage"
import Constants from "../utils/Constants"
import RNPickerSelect from "react-native-picker-select"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"

export default function ManagementAdmin(props) {

    const {navigation} = props



    useEffect(() => {
        getData().then(value =>{
            const apiData = value.split(",")
            getDatesByCareer(apiData)
        })
    }, [])

    const [allAppointments, setAllAppointments] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null)
    const [showDate, setShowDate] = useState(false)
    const [dateChosen, setDateChosen] = useState(null)
    const [showDateButton, setShowDateButton] = useState(false)


    const getDatesByCareer = (data) => {
        getAllAppointmentsAdminAPI(data[1]).then((result) =>{
            console.log(data[1])
            setAllAppointments(result)
        })
    }

    const getDatesByDay = (day, month) => {
        getAllAppointmentsAdminAPI(user[1]).then((result) =>{
            //  console.log(result)
            const data = result.filter(item => item.day == day && item.month  == month)
            setAllAppointments(data)

            if(data.length == 0){
                Toast.show('No Dates found.', Toast.LONG); 
            }

        })
    }

    const showDatePicker = () => {
        setShowDate(true)
    }

    const hideDatePicker = () => {
        setShowDate(false);
        
    };
     
    const handleConfirm = (value) => {
        const date = moment(value).format("LL")
        const dateToSave = moment(value).format("L")
      //  console.log("A date has been picked: ", dateToSave);
        const dateSplit = dateToSave.split("/")
        //console.log(dateSplit)
       // setDateChosen(dateToSave)
       getDatesByDay(dateSplit[1], dateSplit[0])

        hideDatePicker();
    };


    const deleteFromResults = (dataToDelete) => {
        const oldData = allAppointments
        const newData = oldData.filter(item => item !== dataToDelete)

        setAllAppointments(newData)
    }

    const getData = async () => {
        try {
         const value = await AsyncStorage.getItem(Constants.USER_KEY)
          if(value !== null) {
           console.log("Se recupero")
            setUser(value.split(","))
            console.log(value)
            return value
          }
        } catch(e) {
          console.log("no se pudo")
        }
      }

    const myTest = (oldOne,newData) => {
        getAllAppointmentsAdminAPI.then((result) =>{
          //  console.log(result)
            setAllAppointments(result)
            console.log("refresehd")
        })
    }


    const deleteAppointment = (appointmentData) =>{
        if(appointmentData.deletedAdmin === "1"){
            return
        }

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
                    const form = new FormData();
                    form.append('day_week', appointmentData.day);
                    form.append('month', appointmentData.month);
                    form.append('day', appointmentData.day);
                    form.append('hour', appointmentData.hour);
                    form.append('nip', appointmentData.nip);
                    form.append('name', appointmentData.name);
                    form.append('career', appointmentData.career);

                    console.log(form)

                    deleteAppointmentAdminAPI(form).then((result) =>{
                        if(result === 1){
                            Toast.show('Appointment deleted.', Toast.LONG);
                            deleteFromResults(appointmentData)
                        }
                        else{
                            Toast.show('Something went wrong', Toast.LONG);
                        }
                        console.log(result)
                    })
                  }
              }
          ],
          {cancelable: true},
        );

    }

    const switcher = (param) => {
        switch(param){
            case "career" :
                getDatesByCareer(user)
                setShowDateButton(false)
                break

            case "date":
                setShowDateButton(true)
                break

            default :
                setShowDateButton(false)
                break
        }
    }

    if(!user) return null // to protect from movie data not available 

    return (
        <SafeAreaView style={{flex : 1,}}>

            <Title style={styles.titleStyle}> All appointments</Title>

            <View style={{alignItems : "center"}}>

                <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        onValueChange={(value) => switcher(value)}

                        placeholder={{
                            label:"Choose one",
                            value: null
                        }}

                        items={[
                        {label: "By career" , value: "career"},
                        {label: 'By Date', value: "date"},
                        ]}
                    />

                    { showDateButton && 
                        <Button 
                            mode="outlined"
                            onPress={showDatePicker}
                            >
                            Choose a date
                        </Button>
                    }
  
                 
                    


                </View>

                <DateTimePickerModal 
                    isVisible={showDate}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            
            <FlatList 
                data={allAppointments}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.month}${item.day}${item.hour}`}
                contentContainerStyle={{ paddingTop : 20, marginStart : 10, paddingBottom : 20 }}
                ItemSeparatorComponent={() => <Text> ‧ </Text>}

                renderItem={({item}) => (
                    <Appointment allData={item} deleteAppointment={deleteAppointment} navigation={navigation} isAdmin={true} />
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS:{
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        color: "#fff",
        paddingRight: 30,
        backgroundColor: "#0f4c75",
        width : 150,
        marginLeft: -5,
        marginRight: -5,
        marginTop : 20,
        marginBottom : 20,
        marginEnd : 5,

    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 8,
        color: '#fff',
        width : 150,
        backgroundColor: '#0f4c75',
        marginTop : 20,
        marginBottom : 20,
        marginEnd : 5,
      },
});

