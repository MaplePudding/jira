import React, {FormEvent, useState} from "react";
import {RegisterScreen} from "./register";
import {LoginScreen} from "./login";
import {Button, Card, Divider, Typography} from "antd";
import {Helmet} from "react-helmet";
import styled from "@emotion/styled";
import {useDocumentTitle} from "../util";

export const UnauthenticatedApp = () =>{

    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useDocumentTitle('请登录或注册')
    return(
        <Container>
            <ShadowCard>
                <Title>
                    {isRegister ? '请注册' : '请登录'}
                </Title>
                {
                    error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null
                }
                {
                    isRegister ? <RegisterScreen onError={setError}/> : <LoginScreen onError={setError}/>
                }
                <Divider />
                <a onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</a>
            </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding:3.2rem 4rem;
    box-sizing:border-box;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    text-align:center;
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
`
