import { Button } from "./Button";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};
type PropsType = {
  title: string;
  tasks: TaskType[];
};
export function Todolist({ title, tasks }: PropsType) {
  const taskList =
    tasks.length === 0 ? (
      <span>Задач пока нет</span>
    ) : (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />{" "}
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {taskList}
      <div>
        <Button title={"All"} />
        <Button title={"Active"} />
        <Button title={"Completed"} />
      </div>
    </div>
  );
}
