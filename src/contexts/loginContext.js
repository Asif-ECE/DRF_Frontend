import { createContext, useState, useEffect } from "react";
import { userLogin, tokenVerify, refreshToken, userLogout } from "@/utilities/api";

export const LoginContext = createContext()

const LoginProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(false)
    const [isLogging, setIsLogging] = useState(false)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isTokenValid = async () => {
        const res = await tokenVerify()
        setLoginState(res)
    }

    useEffect(() => {
        isTokenValid()
    }, [])


    const handleLogin = async (data) => {
        setIsLogging(true)
        try {
            const response = await userLogin(data)
            if (response) {
                setLoginState(true)
                setIsLogging(false)
                return true
            }
            return false
        }
        catch (error) {
            setError(true)
            setErrorMessage(error.message)
            setIsLogging(false)
            return false
        }

    }

    const handleTokenRefresh = async () => {
        const res = await refreshToken()
        if (res.refreshStatus) {
            setLoginState(true)
        }
    }

    const handleLogout = async () => {
        const response = await userLogout()
        //console.log(response)

        if (response.message == "logout_success") {
            setLoginState(false)
        }
    }

    const clearError = () => {
        setError(false);
        setErrorMessage("");
    };

    return (
        <LoginContext.Provider
            value={{
                loginState,
                handleLogin,
                isLogging,
                error,
                errorMessage,
                clearError,
                isTokenValid,
                handleTokenRefresh,
                handleLogout
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider