import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import styled from "@emotion/styled";

export const RegisterScreen = ({onError}:{onError:(error:Error) => void}) =>{

    const {user,register} = useAuth()

    const handleSubmit = async ({cpassword, ...values}:{username:string; password:string; cpassword:string}) =>{
        if(cpassword !== values.password){
            onError(new Error('请确认两次密码相同'))
            return
        }
        try {
            await register(values)
        }catch(e){
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
            <Form.Item name='cpassword' rules={[{required:true, message: '请输入password'}]}>
                <Input placeholder='确认密码' type='password' id='cpassword' />
            </Form.Item>
            <LongButton type="primary" htmlType='submit'>注册</LongButton>
        </Form>
    )
}

const LongButton = styled(Button)`
 width:100%;
`