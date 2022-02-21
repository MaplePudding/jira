import {Row, ScreenContainer} from "../../components/lib";
import {useProjectInUrl} from "../kanban/util";
import {useEpicSearchParams} from "./util";
import {useEpics} from "../../util/epic";
import {Button, List} from "antd";
import dayjs from "dayjs";
import {useTasks} from "../../util/task";
import { Link } from "react-router-dom";
import {CreateEpic} from "./create-epic";
import {useState} from "react";

export const EpicScreen = () =>{
    const { data: currentProject } = useProjectInUrl();
    const { data: epics} = useEpics()
    const { data:tasks} = useTasks({projectId: currentProject?.id})
    const [epicCreateOpen, setEpicCreateOpen] = useState(false)

    return(
        <ScreenContainer>
            <Row between={true}>
                <h1>{currentProject?.name}任务组</h1>
                <Button onClick={() => setEpicCreateOpen(true)} type='link'>创建任务组</Button>
            </Row>
            <List dataSource={epics} itemLayout='vertical' renderItem={epic => <List.Item>
                <List.Item.Meta title={<Row between={true}>
                    <span>{epic.name}</span>
                    <Button type='link'>删除</Button>
                </Row>}
                                description={<div>
                                    <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                                    <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                                </div>}
                />
                <div>
                    {tasks?.filter(task => task.epicId === epic.id).map(task => <Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>{task.name}</Link>)}
                </div>

            </List.Item>}/>
            <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen}/>
        </ScreenContainer>
    )
}