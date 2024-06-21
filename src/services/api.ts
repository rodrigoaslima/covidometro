import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://covid-api.com/api'
})

export default Api