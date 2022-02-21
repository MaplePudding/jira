import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Kanban } from "../type/kanban";
import { Project } from "../screen/project-list/list";
import { useAddConfig, useReorderConfig } from "./use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderConfig(queryKey));
};
