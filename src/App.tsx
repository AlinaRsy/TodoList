import "./App.css";
import { TaskType, Todolist } from "./components/todolist";
const todoTitle_1 =  "What to learn";
const tasks1: TaskType[] = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: false },
];

function App() {
  return (
    <div className="app">
      <Todolist title={todoTitle_1} tasks={tasks1} />
    </div>
  );
}

export default App;
