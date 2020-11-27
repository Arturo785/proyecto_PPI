import React, {useState} from 'react'
import { StyleSheet, Text, View, LogBox } from 'react-native'
import { Button, HelperText, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import RNPickerSelect from "react-native-picker-select"
import moment from "moment"
import {updateAppointmentAPI} from "../api/ApiConnection"



import Toast from 'react-native-simple-toast';
import Navigation from '../navigation/Navigation';

export default function UpdateDates(props) {

    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

    //console.log(props)

    const {route, navigation} = props

    const {allData, setRefresh} = route.params


    const [isPickerVisible, setIsPickerVisible] = useState(false)
    const [dateChosen, setDateChosen] = useState(null)
    const [hourChosen, setHourChosen] = useState(null)
    const [minuteChosen, setMinuteChosen] = useState(null)
    const [allCorrect, setAllCorrect] = useState(false)
    const [dataToSend, setDataToSend] = useState(null)

    const showDatePicker = () => {
        setIsPickerVisible(true)
    }

    const hideDatePicker = () => {
        setIsPickerVisible(false);
        
    };
     
    const handleConfirm = (value) => {
        const date = moment(value).format("LL")
        const dateToSave = moment(value).format("L")
       // console.log("A date has been picked: ", date);
        setDateChosen(dateToSave)
        hideDatePicker();
    };

    const formatAllData = () => {

        const dateSplit = dateChosen.split("/")

        const dayToSend = dateSplit[1] 
        const monthToSend = dateSplit[0] 

        const hourToSend = `${hourChosen}:${minuteChosen}`

        const form = new FormData();
        form.append('day_week', allData.day);
        form.append('month', allData.month);
        form.append('day', allData.day);
        form.append('hour', allData.hour);
        form.append('nip', allData.nip);
        form.append('name', allData.name);
        form.append('career', allData.career);

        form.append('monthNew', monthToSend);
        form.append('dayNew', dayToSend);
        form.append('hourNew', hourToSend);

        return form
    }

    const saveDataFromAppointment = () =>{
 
        if(dateChosen && hourChosen && minuteChosen !== null ){
            //Everything was ok
            setAllCorrect(false)
 
             const allDataNew = formatAllData();
             setDataToSend(allDataNew)
 
             updateAppointmentAPI(allDataNew).then((response) =>{
                 console.log(response)
                 if(response === 1){
                     Toast.show('Appointment changed.', Toast.LONG);
                     setRefresh()
                     navigation.goBack()
                    

                 }
                 else{
                     Toast.show('Please try other date.', Toast.LONG);
                 }
             })
        }
        else{
            //There was some error
            setAllCorrect(true)
        }
 
     }

    return (
        <SafeAreaView>

            <View style={styles.mainContainer}>

                <Title style={{fontSize : 24}}>
                    Old data
                </Title>

                <View style={styles.oldContentContainer}>

                    <Text style={styles.textStyle}>
                        Day: {allData.day}
                    </Text>

                    <Text style={styles.textStyle}>
                        Month: {allData.month}
                    </Text>

                    <Text style={styles.textStyle}>
                        Hour: {allData.hour}
                    </Text>

                </View>

                <Button 
                mode="outlined"
                onPress={showDatePicker}
                >
                  Choose a date
                </Button>

                {dateChosen &&  
                <Text style={styles.textStyle}>Date choosen {dateChosen}</Text>
            }

                <View style={styles.pickerTimes}>

                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setHourChosen(value)}

                        placeholder={{
                            label:"Hours",
                            value: null
                        }}

                        items={[
                        {label: "8 am" , value: 8},
                        {label: '9 am', value: 9},
                        {label: '10 am', value: 10},
                        {label: '11 am', value: 11},
                        {label: '12 am', value: 12},
                        {label: '1 pm', value: 1},
                        {label: '2 pm', value: 2},
                        ]}
                    />

                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setMinuteChosen(value)}

                        placeholder={{
                            label:"Minutes",
                            value: null
                        }}

                        items={[
                        {label: "0' clock" , value: 0},
                        {label: '15', value: 15},
                        {label: '30', value: 30},
                        {label: '45', value: 45},
                        ]}
                    />

                </View>

                <DateTimePickerModal 
                    isVisible={isPickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={setIsPickerVisible}
                />

                <Button 
                    mode="outlined"
                    icon="pencil"
                    onPress={saveDataFromAppointment}
                    style={{marginTop : 20, borderColor: "#590995", borderWidth: 2}}
                >
                    Change appointment
                </Button>


                <HelperText 
                    visible={allCorrect}
                    type="error" 
                    style={{fontSize : 14}}
                >
                    Please fill all the data
                </HelperText>


            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        alignItems : "center"
    },
    textStyle : {
        fontSize : 15,
        color : "#fff",
        margin : 10
    },
    oldContentContainer : {
        flexDirection : "row",
        alignContent : "space-around"
    },
    pickerTimes :{
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
    },

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
