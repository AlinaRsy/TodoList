import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { TaskType, FilterValuesType, TodoListType, TasksStateType } from "./types";
import { CreateItemForm } from "./CreateItemForm";

const todoListId1 = v1();
const todoListId2 = v1();
function App() {
  //data
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId1, title: "What to BUY", filter: "all" },
    { id: todoListId2, title: "What to LEARN", filter: "active" },
  ]);
  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "bread", isDone: true },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "banana", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "REACT", isDone: false },
    ],
  });

  //functions
  const deleteTask = (tasksId: TaskType["id"], todoId: TodoListType['id']) => {
    const nextStateOfData: TaskType[] = tasks[todoId].filter((t) => t.id !== tasksId);
    setTasks({...tasks, [todoId]: nextStateOfData});
  };

  const createTask = ( todoId: string, title: string,) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextStateOfData = [...tasks[todoId], newTask];
    setTasks({...tasks, [todoId]:nextStateOfData});
  };

  const changeTaskStatus = (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
    todoId: TodoListType['id']
  ) => {
    const nextStateOfData = tasks[todoId].map((t) =>
      t.id === taskId ? { ...t, isDone: isDone } : t,
    );
    setTasks({...tasks, [todoId]:nextStateOfData});
  };

  const changeTasksTitle = (todoId:string, taskId:string, title:string) =>{
    const newTasks = tasks[todoId].map(task=>task.id===taskId?{...task, title: title}: task)
        setTasks({...tasks, [todoId]:newTasks});

  }
  //for todoLists
  const changeTodolistFilter = (
    filter: FilterValuesType,
    todoListId: string,
  ) => {
    const newTodoLists = todoLists.map((tl) => {
      return tl.id === todoListId ? { ...tl, filter } : tl;
    });
    setTodoLists(newTodoLists);
  };

  const removeTodoList = (todoId: TodoListType['id'])=>{
    const newTodoLists = todoLists.filter(todoList=>todoList.id!==todoId);
    setTodoLists(newTodoLists);
    delete tasks[todoId];
    setTasks({...tasks})
  }
  const createTodoListHandler = (title:string)=>{
    const newTodoList:TodoListType = {id: v1(), title, filter:'all'};
    setTodoLists([newTodoList, ...todoLists])
    setTasks({...tasks, [newTodoList.id]:[]})
  }
  const changeTodoListTitle = (todoId:string, title:string)=>{
    const newTodos = todoLists.map(tl=>tl.id===todoId?{...tl,title:title}:tl)
    setTodoLists(newTodos)
  }

  return (
    <div className="app">
      <CreateItemForm createItem={createTodoListHandler}/>
      {todoLists.map((tl) => {
        let filteredTasks = tasks[tl.id];
        if (tl.filter === "active") {
          filteredTasks = tasks[tl.id].filter((task) => !task.isDone);
        }
        if (tl.filter === "completed") {
          filteredTasks = tasks[tl.id].filter((task) => task.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            todoList={tl}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            createTask={createTask}
            changeTodolistFilter={changeTodolistFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
            changeTasksTitle={changeTasksTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
