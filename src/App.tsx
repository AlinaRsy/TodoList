import React, { useRef, useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { getFilteredTasks } from "./utils";
import { v1 } from "uuid";
import { TaskType } from "./types";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const storageForCountCreatedTasks = useRef<number>(3);
  // Data
  const todolistTitle = "What to learn";
  const [tasks, setTasks] = React.useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const deleteTask = (tasksId: TaskType["id"]) => {
    const nextStateOfData: TaskType[] = tasks.filter((t) => t.id !== tasksId);
    setTasks(nextStateOfData);
  };
  const createTask = (title: TaskType["title"]) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextStateOfData: TaskType[] = [...tasks, newTask];
    setTasks(nextStateOfData);
    storageForCountCreatedTasks.current += 1;
  };

  const changeTaskStatus=(taskId:TaskType['id'], isDone:TaskType['isDone'])=>{
    const nextStateOfData:TaskType[] = tasks.map(t=>t.id===taskId ? {...t, isDone: isDone} : t);
    setTasks(nextStateOfData);
  }

  const changeTodolistFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue);
  };
  //
  return (
    <div className="app">
      <Todolist
        totalTasksCount={storageForCountCreatedTasks.current}
        title={todolistTitle}
        tasks={getFilteredTasks(tasks, filter)}
        filter={filter}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
