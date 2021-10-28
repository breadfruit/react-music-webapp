import axios from 'axios'

exoprt const baseUrl = 'http://192.168.1.7:4000'


const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use (
    res => res.data,
    err => {
        console.log(err, "网络错误")
    }
)

export {
    axiosInstance
}；