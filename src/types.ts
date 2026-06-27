export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
// export type TasksStateType = {
//   [key: TodoListType["id"]]: TaskType[];
// };
export type TasksStateType = Record<string, TaskType[]>

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
