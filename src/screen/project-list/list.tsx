import {User} from "./searchPanel";
import React from "react";
import {Table} from "antd";
import dayjs from "dayjs";

interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
    created: number
}

interface ListProps{
    list: Project[]
    users: User[]
}

export const List = (props:ListProps) =>{

    const {list, users} = props
    return<Table pagination={false} columns={[
        {
            title:'名称',
            dataIndex:'name'
        },
        {
          title: "部门",
          dataIndex: "organization"
        },
        {
            title:'负责人',
            render(value, project){
                return(
                    <span>
                        {
                            users.find((user) => user.id === project.personId)?.name || '未知'
                        }
                    </span>
                )
            }
        },
        {
            title:'创建时间',
            render(value, project){
                return(
                    <span>
                        {
                            dayjs(project.created).format('YYYY-MM-DD HH:mm:ss')
                        }
                    </span>
                )
            }
        }

            ]} dataSource={list}/>
}