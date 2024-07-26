'use client';
import React, { useState } from 'react';
import Pomodoro from './Pomodoro';
import { toast } from 'react-toastify';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
      toast.success('Todo added successfully!');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
    toast.info('Todo removed');
  };

  return (
    <div className="bg-background text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-4xl mx-auto mt-4 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Todo List with Pomodoro</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <Pomodoro />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-grow p-2 mr-2 bg-primary text-white rounded"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
            />
            <button
              onClick={addTodo}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-80"
            >
              Add
            </button>
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {todos.map((todo, index) => (
              <li key={index} className="bg-primary p-2 mb-2 rounded flex justify-between items-center">
                <span className="break-words w-3/4">{todo}</span>
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-secondary text-white px-2 py-1 rounded hover:bg-opacity-80"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;