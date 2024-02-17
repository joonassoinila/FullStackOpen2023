import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}
const create = (newObject) =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const update = (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    console.log("Test")
    return request.then(response =>{
        if(response.status<200 || response.status>=300){
            throw new Error(`Update request failed with status ${response.status}`)
        }
        return response.data
    })
}

const deleteName = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteName }