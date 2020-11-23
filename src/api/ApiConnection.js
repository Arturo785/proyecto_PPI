import axios from "axios"
import {BASE_URL} from "../utils/Constants"


export function saveAppointmentAPI(dataSent){
    const url = `${BASE_URL}/altasCitas.php?`

    const headers = {
        'Accept':'application/json',
        'Content-Type': 'multipart/form-data',
    }
    
    try {
        return axios({
            url : url,
            method : "POST",
            data : dataSent,
            headers : headers
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function getAllAppointmentsAPI(code){
    const url = `${BASE_URL}/verCitas.php?nip=${code}`

    try {
       return axios.get(url)
            .then((result) =>{
                return result.data
            })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}


export function deleteAppointmentAPI(data){
    const url = `${BASE_URL}/bajasCitas.php?&month=${data.month}&day=${data.day}&hour=${data.hour}&nip=${data.nip}`

    try {
        return axios.get(url)
             .then((result) =>{
                 return result.data
             })
     }
     catch(error){
         console.error(error);
         console.error("SALIO MAL");
     }

}

export function updateAppointmentAPI(dataToSend){
    const url = `${BASE_URL}/UpdateCitas.php?`

    try {
        return axios({
            url : url,
            method : "POST",
            data : dataToSend,
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }

}

export function createAdminAPI(dataToSend){
    const url = `${BASE_URL}/AddAdmin.php?`

    try {
        return axios({
            url : url,
            method : "POST",
            data : dataToSend,
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }

}

export function verifyAdminAPI(dataToSend){
    const url = `${BASE_URL}/adminLogin.php?`

    try {
        return axios({
            url : url,
            method : "POST",
            data : dataToSend,
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }

}