import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import styled from "@emotion/styled";

export const RegisterScreen = () =>{

    const {user,register} = useAuth()

    const handleSubmit = (values:{username:string, password:string}) =>{
        register(values)
    }


    return(
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{required:true, message: '请输入username'}]}>
                <Input placeholder='用户名' type='text' id='username' />
            </Form.Item>
            <Form.Item name='password' rules={[{required:true, message: '请输入password'}]}>
                <Input placeholder='密码' type='password' id='password' />
            </Form.Item>
            <LongButton type="primary" htmlType='submit'>注册</LongButton>
        </Form>
    )
}

const LongButton = styled(Button)`
 width:100%;
`