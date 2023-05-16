import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { callFetch, useErrorMessage, useForm } from './Hooks';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [sortCriterion, setSortCriterion] = useState(null);
  const { id } = useParams();
  const [inputs,handleChange] = useForm()
  const [errorMessage,setErrorMessage] = useErrorMessage()
  
  useEffect(() => {
    return  async () => {
      try{
        const data = await callFetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
        setTodos(data);
      }catch{
        setErrorMessage("Oops..! You're Not conected!")
      }
    }
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
    <div>
      <h2>Todos:</h2>
      <h4>{errorMessage}</h4>
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
          name={`chechbox${todo.id}`}
            type="checkbox"
            checked={inputs[`chechbox${todo.id}`] === undefined ? 
                      todo.completed : inputs[`chechbox${todo.id}`]}
            onChange={handleChange}
          />
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Todos;
