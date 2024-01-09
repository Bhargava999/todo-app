import "./App.css";
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import selectIcon from "./images/icon-check.svg";
import CrossIcon from "./images/icon-cross.svg";
import { useState } from "react";

const todos = [
  { id: 0, title: "Complete online JavaScript course", completed: true },
  { id: 1, title: "Jog around the park 3x", completed: false },
  { id: 2, title: "10 minutes meditation", completed: false },
  { id: 3, title: "Read for 1 hour", completed: false },
  { id: 4, title: "Pick up groceries", completed: false },
  { id: 5, title: "Complete Todo App on FrontEnd Mentor", completed: false },
];

function App() {
  const [theme, setTheme] = useState(true);
  const [newTodos, setNewTodos] = useState(todos);

  function handleTheme() {
    setTheme((theme) => !theme);
  }

  function handleTodo(item) {
    setNewTodos([...newTodos, item]);
  }

  function handleToggle(id) {
    setNewTodos(
      newTodos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleDelete(id) {
    setNewTodos(newTodos.filter((item) => item.id !== id));
  }

  function handleClear() {
    setNewTodos([]);
  }

  return (
    <main className={`app ${theme ? "dark" : "light"}`}>
      <div className="container">
        <header className="header">
          <h1>TODO</h1>
          {theme ? (
            <img src={sunIcon} alt="sun" onClick={handleTheme} />
          ) : (
            <img
              src={moonIcon}
              alt="moon
            "
              onClick={handleTheme}
            />
          )}
        </header>
        <Form onAddTodo={handleTodo} />
        <List
          newTodos={newTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onClear={handleClear}
        />
      </div>
    </main>
  );
}

function Form({ onAddTodo }) {
  const [description, setDescription] = useState("");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newTodo = { title: description, id: id, completed: false };
    onAddTodo(newTodo);
    setDescription("");
  }
  return (
    <form className="form-controll" onSubmit={handleSubmit}>
      <button className="circle"></button>
      <input
        placeholder="Create a new todo"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
}

function List({ newTodos, onToggle, onDelete, onClear }) {
  const [sortedby, setSortedBy] = useState("all");
  const itemsleft = newTodos.slice().filter((todo) => !todo.completed).length;
  let sortedTodos;

  if (sortedby === "all") sortedTodos = newTodos;
  if (sortedby === "active")
    sortedTodos = newTodos.slice().filter((todo) => !todo.completed);

  if (sortedby === "completed")
    sortedTodos = newTodos.slice().filter((todo) => todo.completed);
  return (
    <ul className="list">
      {sortedTodos.map((todo) => (
        <ListItem
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          key={todo.id}
        />
      ))}
      {newTodos.length > 0 && (
        <ListFooter
          onClear={onClear}
          sortedby={sortedby}
          onSortedBy={setSortedBy}
          itemsleft={itemsleft}
        />
      )}
    </ul>
  );
}

function ListItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-item">
      <div className="flex-container">
        <div className="flex-start">
          {
            <button
              className={`circle ${todo.completed ? "checked" : ""}`}
              onClick={() => onToggle(todo.id)}
            >
              {todo.completed && <img src={selectIcon} alt="select" />}
            </button>
          }

          <p className={todo.completed ? "strike" : ""}>{todo.title}</p>
        </div>
        <div className="flex-end">
          {todo.completed && (
            <img
              src={CrossIcon}
              alt="cross"
              className="cross-icon"
              onClick={() => onDelete(todo.id)}
            />
          )}
        </div>
      </div>
    </li>
  );
}

function ListFooter({ onClear, sortedBy, onSortedBy, itemsleft }) {
  return (
    <div className="list-footer">
      <span>{itemsleft > 0 ? `${itemsleft} items left` : " "}</span>
      <Actions sortedBy={sortedBy} onSortedBy={onSortedBy} />
      <div className="btn" onClick={onClear}>
        Clear Completed
      </div>
    </div>
  );
}

function Actions({ sortedBy, onSortedBy }) {
  return (
    <div
      className="category"
      value={sortedBy}
      onChange={(e) => onSortedBy(e.target.value)}
    >
      <div className="catgory-item">
        <input type="radio" name="category-type" value="all" id="all" />
        <label className="category-btn" htmlFor="all">
          All
        </label>
      </div>
      <div className="catgory-item">
        <input type="radio" name="category-type" value="active" id="active" />
        <label className="category-btn" htmlFor="active">
          Active
        </label>
      </div>
      <div className="catgory-item">
        <input
          type="radio"
          name="category-type"
          value="completed"
          id="completed"
        />
        <label className="category-btn" htmlFor="completed">
          Completed
        </label>
      </div>
    </div>
  );
}

export default App;
