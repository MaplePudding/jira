import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import styled from "@emotion/styled";
import {useAsync} from "../util/use-async";

export const LoginScreen = ({onError}:{onError:(error:Error) => void}) =>{

    const {login, user} = useAuth()
    const {run, isLoading, error} = useAsync(undefined, {throwOnError: true})

    const handleSubmit = async (values:{username:string, password:string}) =>{
        try{
            await run(login(values))
        }catch (e){
            await onError(e as Error)
        }
    }

    return(
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{required:true, message: '请输入username'}]}>
                <Input placeholder='用户名' type='text' id='username' />
            </Form.Item>
            <Form.Item name='password' rules={[{required:true, message: '请输入password'}]}>
                <Input placeholder='密码' type='password' id='password' />
            </Form.Item>
            <LongButton loading={isLoading} type="primary" htmlType='submit'>登录</LongButton>
        </Form>
    )
}


const LongButton = styled(Button)`
 width:100%;
`