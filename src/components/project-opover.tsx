import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../util/project";
import styled from "@emotion/styled";
import {useProjectModal} from "../screen/project-list/util";
import {HeaderItem} from "../authenticated-app";

export const ProjectPopover = () => {
    const { data: projects } = useProjects();
    const { open } = useProjectModal();
    const pinnedProjects = projects?.filter((project) => project.pin);
    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <Button type={"link"} onClick={open}>
                创建项目
            </Button>
        </ContentContainer>
    );
    return (
        <Popover placement={"bottom"} content={content}>
            <HeaderItem>项目</HeaderItem>
        </Popover>
    );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;