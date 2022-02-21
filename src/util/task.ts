import { Query, QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Task } from "../type/task";
import { cleanObject } from "./index";
import { Kanban } from "../type/kanban";
import {
  useAddConfig,
  useEditConfig,
  useReorderConfig,
} from "./use-optimistic-options";
import { Project } from "../screen/project-list/list";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    //@ts-ignore
    client("tasks", { data: cleanObject(params) })
  );
};

export const useAddTasks = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderConfig(queryKey));
};
