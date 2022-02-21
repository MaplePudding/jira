import {Link, useLocation} from "react-router-dom";
import { Route, Routes } from 'react-router'
import { EpicScreen } from "../epic";
import {KanbanScreen} from "../kanban";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () =>{
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}

export const ProjectScreen = () =>{
    const routeType = useRouteType()
    return(
        <Container>
            <Aside>
                <Menu mode={'inline'} selectedKeys={[routeType]}>
                    <Menu.Item key='kanban'>
                        <Link to={'kanban'} >看板</Link>
                    </Menu.Item>
                    <Menu.Item key='epic'>
                        <Link to={'epic'} >任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path={'/kanban'} element={<KanbanScreen />} />
                    <Route path={'/epic'} element={<EpicScreen />} />
                    <Route path={'/'} element={<KanbanScreen />} />
                </Routes>
            </Main>
        </Container>
    )
}

const Aside = styled.aside`
    background-color: color(244, 245, 247);
    display: flex;
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
    display: flex;
`

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 16rem 1fr;
`