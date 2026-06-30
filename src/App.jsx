import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      text: input,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, todoIndex) =>
      todoIndex === index
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodos(newTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="App">
      <div className="header">
        <h1>
          Task<span>Master</span>
        </h1>
        <p>Stay organized. Get things done.</p>
      </div>

      <form className="todoadd" onSubmit={(e) => { 
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />

        <button type="submit">Add</button>
      </form>

      <div className="stats">
        <p>{todos.length} Tasks</p>
        <span>•</span>
        <p>{completedCount} Completed</p>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <div className="task-left">
              <button
                className="check-btn"
                onClick={() => toggleTodo(index)}
              >
                {todo.completed ? "✓" : ""}
              </button>

              <span>{todo.text}</span>
            </div>

            <button
              className="delete-btn"
              onClick={() => removeTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;