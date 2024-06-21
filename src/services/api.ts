import axios from 'axios'

export const CovidApi = axios.create({
    baseURL: 'https://covid-api.com/api'
})

export const IsoApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
})
