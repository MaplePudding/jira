import styled from "@emotion/styled";
import { Card } from "antd";
import {Kanban} from "../../type/kanban";
import {useTasksModal, useTasksSearchParams} from "./util";
import {useTasks} from "../../util/task";
import {CreateTask} from "./create-task";
import {Task} from "../../type/task";
import {Mark} from "../../components/mark";
import React from "react";
import {Drag, Drop, DropChild} from "../../components/drag-and-drop";

const TaskCard = ({task}:{task:Task}) =>{
    const {startEdit} = useTasksModal()
    const {name: keyword} = useTasksSearchParams()
    return(
        <Card onClick={() => startEdit(task.id)} style={{ marginBottom: "0.5rem" }} key={task.id}>
            <Mark keyword={keyword} name={task.name}/>
        </Card>
    )
}

export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban , ...props}, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
    const {startEdit} = useTasksModal()
    return (
        <Container {...props} ref={ref}>
            <h3>{kanban.name}</h3>
            <TasksContainer>
                <Drop type='ROW' direction='vertical' droppableId={String(kanban.id)}>
                    <DropChild>
                        {tasks?.map((task, taskIndex) =>
                            <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                                <div ref={ref}>
                                <TaskCard key={task.id}  task={task} />
                                </div>
                            </Drag>)}
                        <CreateTask kanbanId={kanban.id} />
                    </DropChild>
                </Drop>
            </TasksContainer>
        </Container>
    );
})



export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;