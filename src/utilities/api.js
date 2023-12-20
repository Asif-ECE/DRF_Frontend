import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api'

/**
 * API Endpoints
 * ('signup/', "User signup"),
 * ('token/', "User login"),
 * ('customtoken/', "Custom user login with refresh token http_only setup"),
 * ('token/refresh/', "Refresh the access token"),
 * ('token/verify/', "Check token validation"),
 * ('logout/', "Logout"),
 */


//('signup/', "User signup")
export const userSignup = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/signup/`, formData)

    try {
        if (response.data.status === 200) {
            console.log("Signup success")
            return true
        }
        else {
            console.log("Signup failed for some reason: ", response)
            return false
        }
    }
    catch (error) {
        console.log("Error occured during signup: ", error)
        return false
    }
}


//('token/', "User login")
export const userLogin = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/token/`, formData)
        localStorage.setItem('drfAccessToken', response.data.access)
        localStorage.setItem('drfRefreshToken', response.data.refresh)
        if (response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        throw error
        return false
    }
}


//('token/verify/', "Check token validation")
//curl -X POST -H "Content-Type: application/json" -d '{"token": "<access_token>"}' http://localhost:8000/api/token/verify/
export const tokenVerify = async () => {
    const accessToken = localStorage.getItem('drfAccessToken')

    if (!accessToken) {
        console.log("User is logged out!")
        return
    }

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
        console.log(response.data.code == "token_not_valid" ? "invalidToken" : "validToken")
        return (response.data.code == "token_not_valid" ? false : true)
    } catch (error) {
        console.log("Error during token verification:", error)
        return false
    }
}


//('token/refresh/', "Refresh the access token")
export const refreshToken = async () => {
    const accessToken = localStorage.getItem('drfRefreshToken')

    const data = {
        "refresh": accessToken
    }

    const res = {
        "refreshStatus": false,
        "message": "unchecked"
    }

    if (!accessToken) {
        console.log("User is not logged in!")
        res["message"] = "User in not logged in!"
        return res
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, data);

        if (response.status === 200) {
            localStorage.setItem('drfAccessToken', response.data.access)
            res["refreshStatus"] = true
            res["message"] = "refresh_success"
            console.log(res)
            return res
        }
        else {
            console.log(response)
            return res
        }
    }
    catch (err) {
        if (err.response.status === 401) {
            res["message"] = "token_expired"
            console.log(res)
            return res
        }
        else {
            console.log(err)
            res["message"] = "someting_went_wrong"
            return res
        }
    }
}


//('logout/', "Logout")
export const userLogout = async () => {
    const access = localStorage.getItem('drfAccessToken')
    const refresh = localStorage.getItem('drfRefreshToken')

    const data = {
        "refresh_token": refresh,
        "access_token": access
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/logout/`, data)

        localStorage.removeItem('drfAccessToken')
        localStorage.removeItem('drfRefreshToken')

        data["message"] = "logout_success"
        data["response"] = response

        return data
    }
    catch (error) {
        console.log("Error while logging out: ", error)
        return error.response
    }
}