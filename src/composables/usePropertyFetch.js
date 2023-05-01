import axios from 'axios'

export default function(){

    const apiKey = "06mRI1jJ7CbUWDNtMFyvhP3oO4A_a5Tl"

    async function getProperties(){
        let response = await axios({
            method: "get",
            url: "https://api.intern.d-tt.nl/api/houses",
            headers: {"X-Api-Key": apiKey }
        })
        return response
    }

    async function createProperty(data){
        let response = await axios({
            method: "post",
            url: "https://api.intern.d-tt.nl/api/houses",
            headers: {"X-Api-Key": apiKey},
            data: data
        })
        return response
    }

    async function editProperty(id, data){
        let response = await axios({
            method: "post",
            url: `https://api.intern.d-tt.nl/api/houses/${id}`,
            headers: {"X-Api-Key": apiKey,"Content-Type": "multipart/form-data" },
            data: data
        })
        return response
    }

    async function deleteProperty(id){
        let response = await axios({
            method: "delete",
            url: `https://api.intern.d-tt.nl/api/houses/${id}`,
            headers: {"X-Api-Key": apiKey }
        })
        return response
    }

    async function uploadImage(id){
        let response = await axios({
            method: "post",
            url: `https://api.intern.d-tt.nl/api/houses/${id}/upload`,
            headers: {"X-Api-Key": apiKey }
        })
        return response
    }

    return {
        getProperties,
        createProperty,
        editProperty,
        deleteProperty,
        uploadImage
    }
}