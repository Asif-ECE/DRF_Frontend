import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api'


//login api
export const userLogin = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/token/`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


//verify token
//curl -X POST -H "Content-Type: application/json" -d '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyODE1NTAyLCJpYXQiOjE3MDI4MTUyMDIsImp0aSI6IjdiOTg2MjJiNGI2YjQ4Mzg5M2VhZWFlYWUzNDg1MDQ4IiwidXNlcl9pZCI6N30.V9BG0EK975IEBcrdyAC0nTtLUo9l0GgXKcnAowrhNpo"}' http://localhost:8000/api/token/verify/
export const tokenVerify = async () => {
    const accessToken = localStorage.getItem('drfAccessToken')

    const headers = {
        'Content-Type': 'application/json',
    };

    const data = {
        "token": accessToken,
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/token/verify/`, data, {
            headers, validateStatus: function (status) {
                return status == 200 | status == 401
            },
        });

        console.log(response.data.code == "token_not_valid" ? "invalid_token" : "valid_token")
    } catch (error) {
        console.log("Error during token verification:", error)
    }
}
