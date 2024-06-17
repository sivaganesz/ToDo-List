import { useState } from "react";

export default function Todo(props) {
  const { todo, setTodos, setNotification } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(todo.todo);

  const updateTodoStatus = async (todoId, todoStatus) => {
    const res = await fetch(`/api/todos/${todoId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
      setNotification("Todo completed successfully!");
    }
  };

  const updateTodoContent = async (todoId, newContent) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ todo: newContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, todo: newContent };
          }
          return currentTodo;
        });
      });
      setIsEditing(false);
      setNotification("Todo edited successfully!");
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
      setNotification("Todo deleted successfully!");
    }
  };

  return (
    <div className="todo">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodoContent(todo._id, newContent);
          }}
        >
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setNewContent(todo.todo);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{todo.todo}</p>
          <div className="mutations">
            <button
              className="todo__status"
              onClick={() => updateTodoStatus(todo._id, todo.status)}
            >
              {todo.status ? "☑" : "☐"}
            </button>
            <button className="todo__edit" onClick={() => setIsEditing(true)}>
              ✏️
            </button>
            <button className="todo__delete" onClick={() => deleteTodo(todo._id)}>
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}
