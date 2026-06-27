import { FilterValuesType } from "./types";
import { TaskType } from "./types";

export const getFilteredTasks = (
  tasks: TaskType[],
  filter: FilterValuesType,
): TaskType[] => {
  return filter === "active"
    ? tasks.filter((t) => !t.isDone)
    : filter === "completed"
      ? tasks.filter((t) => t.isDone)
      : tasks;
};
