import {useKanbanQueryKey, useProjectIdInUrl} from "./util";
import {useState} from "react";
import {useAddKanban} from "../../util/kanban";
import {ColumnsContainer} from "./index";
import { Input } from "antd";
import {Container} from "./kanban-column";

export const CreateKanban = () =>{
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const {mutateAsync: addKanban} = useAddKanban(useKanbanQueryKey())

    const submit = async () =>{
        await addKanban({name, projectId})
        setName('')
    }

    return(
        <Container>
            <Input size='large' placeholder={'新建看板名称'} onPressEnter={submit} value={name} onChange={ e => setName(e.target.value)}/>
        </Container>
    )
}