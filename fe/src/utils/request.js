import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:18001'
})

export default request