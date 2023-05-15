import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [sortCriterion, setSortCriterion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${id}`
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);//only first time 

  useEffect(() => {
    if (sortCriterion) {
      const sortedTodos = [...todos].sort((a, b) => {
        if (sortCriterion === 'id') {
          return a.id - b.id;
        } else if (sortCriterion === 'completed') {
          return a.completed - b.completed;
        } else if (sortCriterion === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortCriterion === 'random') {
          return Math.random() - 0.5;
        }
      });
      setTodos(sortedTodos);
    }
  }, [sortCriterion]);

  const handleCheckboxChange = (todoId) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
    });
  };


  return (
    <div>
      <h2>Todos:</h2>
      <div>
        <select value={sortCriterion} onChange={(event) => setSortCriterion(event.target.value)}>
          <option value="">Sort by:</option>
          <option value="id">ID</option>
          <option value="completed">Completed</option>
          <option value="title">Title</option>
          <option value="random">Random</option>
        </select>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id)}
          />
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Todos;
