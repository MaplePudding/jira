import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";

export const RegisterScreen = () =>{

    const {user,register} = useAuth()

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        register({username, password})
    }


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='userName' >用户名</label>
                <input type='text' className='login-un'/>
            </div>
            <div>
                <label htmlFor='password'>密码</label>
                <input type='password' className='login-pwd'/>
            </div>
            <button type='submit'>注册</button>
        </form>
    )
}