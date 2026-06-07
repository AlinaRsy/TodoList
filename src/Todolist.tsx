// import { useRef } from "react";
import { useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./Button";
import { TaskType } from "./types";

type PropsType = {
  totalTasksCount: number;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  deleteTask: (tasksId: TaskType["id"]) => void;
  changeTodolistFilter: (newFilterValue: FilterValuesType) => void;
  createTask: (title: TaskType["title"]) => void;
  changeTaskStatus: (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => void;
};

export const Todolist = ({
  totalTasksCount,
  title,
  tasks,
  filter,
  deleteTask,
  changeTodolistFilter,
  createTask,
  changeTaskStatus,
}: PropsType) => {
  //   const storageForInputReference = useRef<HTMLInputElement>(null);
  const [titleInput, setTitleInput] = useState("");
  const [error, setError] = useState(false);
  const tasksList =
    tasks.length === 0 ? (
      <span>Your tasks list is empty</span>
    ) : (
      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                onClick={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                checked={t.isDone}
              />
              <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
              <Button title="x" onClick={() => deleteTask(t.id)} />
            </li>
          );
        })}
      </ul>
    );
  const createTaskHandler = () => {
    const title = titleInput.trim();
    if (title !== "") {
      createTask(titleInput);
    } else {
      setError(true);
    }
    setTitleInput("");
  };
  const isTitleValid = titleInput.length > 0 && titleInput.length <= 20;
  return (
    <div>
      <h3>
        {title} <span>Total: {totalTasksCount}</span>
      </h3>

      <div>
        <input
          value={titleInput}
          onChange={(e) => {
            error && setError(false)
            setTitleInput(e.currentTarget.value);

          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isTitleValid) {
              createTaskHandler();
            }
          }}
          className={error ? "error" : ""}
        />
        <Button
          title="+"
          disabled={!isTitleValid}
          onClick={createTaskHandler}
          //   onClick={() => {
          //     if (storageForInputReference.current) {
          //       createTask(storageForInputReference.current.value);
          //       storageForInputReference.current.value = "";
          //     }
          //   }}
        />
        {!error && titleInput.length === 0 && <p>Enter task title</p>}
        {!error && isTitleValid && <p>Max title length 20 characters</p>}
        {!error && titleInput.length > 20 && (
          <p style={{ color: "red" }}>Enter less than 20 characters</p>
        )}
        {error && <p style={{ color: "red" }}>Enter valid title</p>}
      </div>
      {tasksList}
      <div>
        <Button
          className={filter === "all" ? "filter__btn-active" : ""}
          title="All"
          onClick={() => changeTodolistFilter("all")}
        />
        <Button
          className={filter === "active" ? "filter__btn-active" : ""}
          title="Active"
          onClick={() => changeTodolistFilter("active")}
        />
        <Button
          className={filter === "completed" ? "filter__btn-active" : ""}
          title="Completed"
          onClick={() => changeTodolistFilter("completed")}
        />
      </div>
    </div>
  );
};
