import { useSetUrlSearchParam, useUrlQueryParam } from "../../util/url";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useHttp } from "../../util/http";
import { Project } from "./list";

export const useProjectSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectModalOpen({ projectCreate: true });

  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParam();
  return ["projects", params];
};
