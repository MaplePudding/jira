import {ProjectListScreen} from "./screen/project-list";
import React from "react";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {Dropdown, Menu} from "antd";

export const AuthenticatedApp = () =>{
    const {logout, user} = useAuth()

    return (
        <Container>
            <Header>
                <HeaderLeft gap={true}>
                    <HeaderItem>项目</HeaderItem>
                    <HeaderItem>用户</HeaderItem>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                                <a onClick={logout}>登出</a>
                            </Menu.Item>
                        </Menu>
                    }>
                        <a onClick={(e) => e.preventDefault()}>
                            Hi, {user?.name}
                        </a>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
            <Footer>footer</Footer>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas:
        "header header header"
        "main main main"
        "footer footer footer";
    height: 100vh;
`

const Header = styled.div`
    grid-area: header;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`

const HeaderItem = styled.h3`margin-right: 3rem`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.aside`grid-area: footer`
