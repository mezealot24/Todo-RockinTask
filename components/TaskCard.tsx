// TaskCard.tsx
import React, { useState } from 'react';

interface TaskCardProps {
  task: string;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onEdit: (newText: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isSelected, onSelect, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <li className="bg-primary p-2 mb-2 rounded flex justify-between items-center">
      <div className="flex items-center w-3/4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="bg-primary text-white border border-gray-600 rounded px-2 py-1 w-full"
          />
        ) : (
          <span className="break-words">{task}</span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              Edit
            </button>
            <button
              onClick={onRemove}
              className="bg-secondary text-white px-2 py-1 rounded hover:bg-opacity-80"
            >
              Remove
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskCard;