import axios from "axios";

//Creates an axios instance with the specified configuration
const http = axios.create({
    baseURL: process.env.REACT_APP_CONTACT_ENDPOINT,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

//creating a response instance interceptor for the response from the api
http.interceptors.response.use(
    (response) => {
        const { status, data } = response
        return { status, data }
    },
    (err) => {
        console.log(err);
    }
)

http.interceptors.request.use(
    config => {
        config.validateStatus()
        return config
    }
)

export default http