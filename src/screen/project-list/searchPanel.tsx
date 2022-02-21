import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import {Project} from "./list";
import {UserSelect} from "../../components/user-select";

export interface User{
    id:number
    name:string
    email:string
    title:string
    organization:string
    token: string
}

interface SearchPanelProps{
    param:Partial<Pick<Project, 'name' | 'personId'>>
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
                <UserSelect
                    defaultOptionName={"负责人"}
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                />
            </Form.Item>
        </Form>
    )
}
