import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Epic } from "../type/epic";
import { Project } from "../screen/project-list/list";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig,
} from "./use-optimistic-options";

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(["Epics", params], () =>
    client("epics", { data: params })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
