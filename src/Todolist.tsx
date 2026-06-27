import { FilterValuesType, TodoListType } from "./types";
import { Button } from "./Button";
import { TaskType } from "./types";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
  todoList: TodoListType;
  tasks: TaskType[];
  deleteTask: (tasksId: TaskType["id"], todoId: TodoListType["id"]) => void;
  changeTodolistFilter: (filter: FilterValuesType, todoListId: string) => void;
  createTask: (title: TaskType["title"], todoId: TodoListType["id"]) => void;
  changeTaskStatus: (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
    todoId: TodoListType["id"],
  ) => void;
  changeTasksTitle: (
    todoId: TodoListType["id"],
    taskId: TaskType["id"],
    title: string,
  ) => void;
  removeTodoList: (todoId: TodoListType["id"]) => void;
  changeTodoListTitle: (todoId: string, title:string)=>void
};

export const Todolist = ({
  todoList,
  tasks,
  deleteTask,
  changeTodolistFilter,
  createTask,
  changeTaskStatus,
  removeTodoList,
  changeTasksTitle,
  changeTodoListTitle
}: PropsType) => {

  const createTaskHandler = (title: string) => {
    createTask(todoList.id, title);
  };

  const tasksList =
    tasks.length === 0 ? (
      <span>Your tasks list is empty</span>
    ) : (
      <ul>
        {tasks.map((t) => {
          const changeTasksTitleHandler = (title:string) => {
            changeTasksTitle(todoList.id, t.id, title);
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                onClick={(e) =>
                  changeTaskStatus(t.id, e.currentTarget.checked, todoList.id)
                }
                checked={t.isDone}
              />
              <span className={t.isDone ? "task-done" : "task"}>
                <EditableSpan
                  changeTitle={changeTasksTitleHandler}
                  title={t.title}
                />
              </span>
              <Button title="x" onClick={() => deleteTask(t.id, todoList.id)} />
            </li>
          );
        })}
      </ul>
    );
    const changeTodoListTitleHandler = (title:string)=>{
      changeTodoListTitle(todoList.id, title)
    }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>
          <EditableSpan title={todoList.title} changeTitle={changeTodoListTitleHandler}/>
        </h3>
        <Button title="x" onClick={() => removeTodoList(todoList.id)} />
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {tasksList}
      <div>
        <Button
          className={todoList.filter === "all" ? "filter__btn-active" : ""}
          title="All"
          onClick={() => changeTodolistFilter("all", todoList.id)}
        />
        <Button
          className={todoList.filter === "active" ? "filter__btn-active" : ""}
          title="Active"
          onClick={() => changeTodolistFilter("active", todoList.id)}
        />
        <Button
          className={
            todoList.filter === "completed" ? "filter__btn-active" : ""
          }
          title="Completed"
          onClick={() => changeTodolistFilter("completed", todoList.id)}
        />
      </div>
    </div>
  );
};
