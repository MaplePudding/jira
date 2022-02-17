import {stringify} from 'qs'
import {SearchPanel} from "./searchPanel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../util";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param, 2000)

    useEffect(() =>{
        fetch(`${apiUrl}/projects?${stringify(cleanObject(param))}`).then(async res =>{
            if(res.ok){
                setList(await res.json())
            }
        })
    }, [debounceParam])

    useMount(() =>{
        fetch(`${apiUrl}/users`).then(async res =>{
            if(res.ok){
                setUsers(await res.json())
            }
        })
    })
    return(
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            <List list={list} users={users}/>
        </div>
    )
}
