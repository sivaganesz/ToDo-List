import { useEffect, useState } from "react";
import Todo from "./Todo";
import Notification from "./Notification";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();
      setContent("");
      setTodos([...todos, newTodo]);
      setNotification("Todo created successfully!");
    } else {
      alert("Minimum 3 characters required");
    }
  }

  return (
    <main className="container">
      <Notification message={notification} onClose={() => setNotification("")} />
      <h1 className="title">TO-DO LIST APPLICATION</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <button className="form__button " type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} setNotification={setNotification} />
          ))
        }
      </div>
    </main>
  );
}
