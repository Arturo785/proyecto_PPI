import React, {useState} from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { Button, HelperText, Title } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import RNPickerSelect from "react-native-picker-select"
import moment from "moment"

export default function User(props) {

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
        const dateToSave = moment(value).format("l")
       // console.log("A date has been picked: ", date);
        setDateChosen(date)
        hideDatePicker();
    };

    const saveDataFromAppointment = () =>{
       const user = global.userLogged
       console.log(user)

       if(dateChosen && hourChosen && minuteChosen !== null ){
           setAllCorrect(false)
            const allData = `${dateChosen} ${hourChosen} ${minuteChosen} ${user[1]} ${user[3]} ${user[4]} `
            setDataToSend(allData)
            console.log(allData)
       }
       else{
           setAllCorrect(true)
       }

    }


    return (
        <View style={styles.background}>

            <Title style={styles.welcomeText}>
                Register an appointment
            </Title>

            {dateChosen &&  
                <Text style={styles.dateText}>Date choosen {dateChosen}</Text>
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

            <Button 
                mode="outlined"
                onPress={showDatePicker}
            >
                Choose a date
            </Button>

            <Button 
                mode="outlined"
                icon="pencil"
                onPress={saveDataFromAppointment}
                style={{marginTop : 20, borderColor: "#590995", borderWidth: 2}}
            >
                Generate appointment
            </Button>

            <HelperText 
                    visible={allCorrect}
                    type="error" 
                    style={{fontSize : 14}}
                >
                    Please fill all the data
            </HelperText>

            {dataToSend &&  
                <Text style={styles.dateText}>Data: {dataToSend}</Text>
            }

            <DateTimePickerModal 
                isVisible={isPickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={setIsPickerVisible}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    background:{
      //  backgroundColor : "#15212b",
        height: "100%",
        alignItems : "center",
    },
    welcomeText :{
        fontSize : 24,
        color : "#fff",
        paddingTop : 20,
        paddingBottom : 20,
    },
    dateText :{
        fontSize : 15,
        color : "#fff",
        paddingTop : 10,
        paddingBottom : 10,
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


