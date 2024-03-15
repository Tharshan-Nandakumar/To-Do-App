import {useEffect, useState} from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./index.css"
import { ToDoList } from "./ToDoList"


function App() {
const [todos, setTodos] = useState(() => {
  const localValue = localStorage.getItem("ITEMS")
  if (localValue == null) return []

  return JSON.parse(localValue)
})

useEffect(() => {
  localStorage.setItem("ITEMS", JSON.stringify(todos))
}, [todos])

const addTodo = (title) => {
  setTodos((currentTodos) => {
    return [...currentTodos, {id: crypto.randomUUID(), title, completed: false},]
  })
} 

const toggleTodo = (id, completed) => {
  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed}
      }

      return todo
    })
  })
}

const deleteTodo = (id) => {
  setTodos(currentTodos => {
    return currentTodos.filter(todo => todo.id !== id)
      })
  }

  return (
    <>
      <NewTodoForm addToDo = {addTodo}/>
      <h1 className="header">Todo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
    
  );
}

export default App;
