import Login from "@/components/Login/login"
import { useContext } from "react"
import { LoginContext } from "@/contexts/loginContext"

export default function LoginView() {
    return <Login loginContexts={useContext(LoginContext)} />
}