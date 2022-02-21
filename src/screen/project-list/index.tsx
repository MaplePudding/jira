import {SearchPanel} from "./searchPanel";
import {List, Project} from "./list";
import React, {useEffect, useState} from "react";
import {cleanObject, useDebounce, useDocumentTitle, useMount} from "../../util";
import styled from "@emotion/styled";
import {Button, Row, Typography} from "antd";
import {useProjects} from "../../util/project";
import {useUsers} from "../../util/user";
import {useUrlQueryParam} from "../../util/url";
import {useProjectModal, useProjectSearchParam} from "./util";
import {ErrorBox} from "../../components/lib";

export const ProjectListScreen = () => {
    const [param, setParam] = useProjectSearchParam()
    const debounceParam = useDebounce(param, 2000)
    const { open } = useProjectModal();
    const {isLoading, error, data:list} = useProjects(debounceParam)
    const {data: users}  = useUsers()

    useDocumentTitle('项目列表', false)

    return(
        <Container>
            <Row justify={"space-between"}>
                <h1>项目列表</h1>
                <Button type={"link"} onClick={open}>
                    创建项目
                </Button>
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []}/>
            <ErrorBox error={error} />
            <List loading={isLoading} dataSource={list || []} users={users || []}/>
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`
