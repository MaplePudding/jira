import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";

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
        <Form layout={"inline"} style={{marginBottom:"2rem"}}>
            <Form.Item>
                <Input type="text" placeholder='项目名' value={param.name} onChange={(e) => setParam({
                    ...param,
                    name:e.target.value
                })} />

            </Form.Item>
            <Form.Item>
                <Select value={param.personId} onChange={(value) => setParam({...param, personId: value})}>
                    <Select.Option value={''}>
                        负责人
                    </Select.Option>
                    {
                        users.map((user:User) => <Select.Option value={user.id}>{user.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}
