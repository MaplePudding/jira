import {stringify} from 'qs'
import {SearchPanel} from "./searchPanel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../util";
import {useHttp} from "../../util/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param, 2000)
    const client = useHttp()

    useEffect(() =>{
        client('projects', {data:cleanObject(debounceParam)}).then(setList)
    }, [debounceParam])

    useMount(() =>{
        client('users').then(setUsers)
    })
    return(
        <Container>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            <List list={list} users={users}/>
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
