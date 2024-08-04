// TodoList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Pomodoro from './Pomodoro';
import TaskCard from './TaskCard';
import { toast } from 'react-toastify';

interface Todo {
  id: number;
  text: string;
  isSelected: boolean;
  createdAt: Date;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        isSelected: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      toast.success('Todo added successfully!');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (selectedTodoId === id) {
      setSelectedTodoId(null);
    }
    toast.info('Todo removed');
  };

  const toggleTodoSelection = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isSelected: !todo.isSelected } : { ...todo, isSelected: false }
    ));
    setSelectedTodoId(prevId => prevId === id ? null : id);
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const handlePomodoroComplete = () => {
    if (selectedTodoId) {
      setTodos(todos.filter(todo => todo.id !== selectedTodoId));
      setSelectedTodoId(null);
      toast.success('Task completed!');
    }
  };

  // Auto-delete todos older than 7 days
  useEffect(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    setTodos(prevTodos => prevTodos.filter(todo => todo.createdAt > sevenDaysAgo));
  }, []);

  return (
    <div className="bg-background text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-4xl mx-auto mt-4 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Todo List with Pomodoro</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <Pomodoro onComplete={handlePomodoroComplete} selectedTodoId={selectedTodoId} />
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
            {todos.map((todo) => (
              <TaskCard
              key={todo.id}
              task={todo.text}
              isSelected={todo.isSelected}
              onSelect={() => toggleTodoSelection(todo.id)}
              onRemove={() => removeTodo(todo.id)}
              onEdit={(newText) => editTodo(todo.id, newText)}
            />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;