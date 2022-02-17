import React, {useEffect, useState} from "react";

export interface User{
    id:string
    name:string
    email:string
    title:string
    organization:string
    token: string
}

interface SearchPanelProps{
    param:{
        name:string
        personId:string
    }
    setParam:(param:SearchPanelProps['param']) => void;
    users:User[]
} 

export const SearchPanel = (props:SearchPanelProps) =>{
    const {param, setParam, users} = props
    return(
        <form action="">
            <input type="text" value={param.name} onChange={(e) => setParam({
                ...param,
                name:e.target.value
            })} />
            <select value={param.personId} onChange={(e) => setParam({...param, personId: e.target.value})}>
                <option value={''}>
                    负责人
                </option>
                {
                    users.map((user:User) => <option value={user.id}>{user.name}</option>)
                }
            </select>
        </form>
    )
}
