import React, {ReactNode, useState} from "react"
import * as auth from 'auth-provider'
import {User} from "../screen/project-list/searchPanel";
import {http} from "../util/http";
import {useMount} from "../util";
import {useAsync} from "../util/use-async";
import {FullPageLoading} from "../components/lib";

const AuthContext = React.createContext<{
    user:User|null,
    register:(form: AuthForm) => Promise<void>
    login:(form:AuthForm) => Promise<void>
    logout: () => Promise<void>
}|undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export interface AuthForm{
    username:string
    password:string
}

const bootstrapUser = async () =>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}:{children:ReactNode}) =>{
    const {data: user, error, isLoading, isIdle, isError, run, setData:setUser} = useAsync<User | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
            run(bootstrapUser())
    })

    if(isIdle || isLoading){
        return <FullPageLoading />
    }

    if(isError){

    }

    return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('userAuth error')
    }
    return context
}