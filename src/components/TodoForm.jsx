import React, { useState, useCallback, memo } from 'react';
import { Plus } from 'lucide-react';

export const TodoForm = memo(({ onSubmit }) => {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    category: 'general'
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onSubmit(formData);
      setFormData({ text: '', priority: 'medium', category: 'general' });
    }
  }, [formData, onSubmit]);

  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={formData.text}
            onChange={handleInputChange('text')}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <select
            value={formData.priority}
            onChange={handleInputChange('priority')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={formData.category}
            onChange={handleInputChange('category')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
          </select>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});