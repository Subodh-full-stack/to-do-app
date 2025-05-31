import React, { useState, useCallback, memo } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';

export const TodoItem = memo(({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  }, [todo.id, editText, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditText(todo.text);
    setIsEditing(false);
  }, [todo.text]);

  const priorityColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500'
  };

  return (
    <div className={`p-4 border-l-4 ${priorityColors[todo.priority]} bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          
          {isEditing ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
                autoFocus
              />
              <button
                onClick={handleUpdate}
                className="p-1 text-green-600 hover:bg-green-100 rounded"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.text}
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                  todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {todo.priority}
                </span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {todo.category}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});