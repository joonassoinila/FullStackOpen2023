import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const endpointAll = "/api/all"
const endpointSingle = "/api/name"

const getAll = () =>{
    const request = axios.get(`${baseUrl}${endpointAll}`)
    return request.then(response=> response.data)
}
const getSingle = (countryName) => {
    const request = axio.get(baseUrl, `${baseUrl}${endpointSingle}${countryName}`)
    return request.then(response => response.data)
}

export default{getAll, getSingle}