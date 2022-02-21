import {ProjectListScreen} from "./screen/project-list";
import React from "react";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {Button, Dropdown, Menu} from "antd";
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Routes}from "react-router"
import {ProjectScreen} from "./screen/project";
import {ProjectModal} from "./screen/project-list/project-modal";
import {ProjectPopover} from "./components/project-opover";

export const AuthenticatedApp = () =>{

    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen />} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                    </Routes>
                <ProjectModal />
                </Main>
                <Footer>footer</Footer>
            </Router>
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

export const HeaderItem = styled.h3`margin-right: 3rem`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
    grid-area: main;
    display: flex;
    overflow: hidden;
`
const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.aside`grid-area: footer`

const PageHeader = () =>{
    const {logout, user} = useAuth()
    return(
        <Header>
            <HeaderLeft gap={true}>
                <ProjectPopover />
                <HeaderItem>用户</HeaderItem>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}>
                        <Button type={"link"} onClick={logout}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={"link"}>Hi, {user?.name}</Button>
        </Dropdown>
    );
};
