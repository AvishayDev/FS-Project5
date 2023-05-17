import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { callFetch, useErrorMessage, useForm } from './Hooks';
import './Todos.css';

function Todos() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [sortCriterion, setSortCriterion] = useState(null);
  const [inputs, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useErrorMessage();
  
  useEffect(() => {
    return  async () => {
      try {
        const data = await callFetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
        setTodos(data);
      } catch {
        setErrorMessage("Oops..! You're Not connected!");
      }
    };
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

  return (
    <>
      <h1>Todos</h1>
      <div className="click-style">
        {errorMessage && <h4 className="default-style">{errorMessage}</h4>}
        <div>
          <select
            className="default-style"
            value={sortCriterion}
            onChange={(event) => setSortCriterion(event.target.value)}
          >
            <option value="">Sort by:</option>
            <option value="id">ID</option>
            <option value="completed">Completed</option>
            <option value="title">Title</option>
            <option value="random">Random</option>
          </select>
        </div>
        {todos.map((todo) => (
          <div key={todo.id} className="comment-div">
            <input
              className="default-style"
              name={`checkbox${todo.id}`}
              type="checkbox"
              checked={
                inputs[`checkbox${todo.id}`] === undefined
                  ? todo.completed
                  : inputs[`checkbox${todo.id}`]
              }
              onChange={handleChange}
            />
            <span >{todo.title}</span>
          </div>
        ))}
      </div>
    </>
    
  );
}

export default Todos;

