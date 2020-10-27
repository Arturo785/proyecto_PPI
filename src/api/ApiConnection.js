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