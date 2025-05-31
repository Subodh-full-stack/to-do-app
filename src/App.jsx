import React, { useReducer, useState, useEffect, useCallback, useMemo } from 'react';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { StatsPanel } from './components/StatsPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { todoReducer } from './reducers/todoReducer';
import { TodoProvider } from './context/TodoContext';
import { Search, Filter } from 'lucide-react';

const TodoApp = () => {
  // State management
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    searchTerm: ''
  });

  const [todos, setTodos] = useLocalStorage('todos', []);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Effects
  useEffect(() => {
    if (todos.length > 0) {
      state.todos = todos;
    }
  }, []);

  useEffect(() => {
    setTodos(state.todos);
  }, [state.todos, setTodos]);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch]);

  // Memoized calculations
  const filteredTodos = useMemo(() => {
    return state.todos
      .filter(todo => {
        if (state.filter === 'completed' && !todo.completed) return false;
        if (state.filter === 'pending' && todo.completed) return false;
        if (state.searchTerm && !todo.text.toLowerCase().includes(state.searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [state.todos, state.filter, state.searchTerm]);

  const stats = useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [state.todos]);

  // Event handlers
  const handleAddTodo = useCallback((todoData) => {
    dispatch({ type: 'ADD_TODO', payload: todoData });
  }, []);

  const handleToggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const handleUpdateTodo = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  }, []);

  const handleFilterChange = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const handleBulkDelete = useCallback(() => {
    const completedIds = state.todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);
    if (completedIds.length > 0) {
      dispatch({ type: 'BULK_DELETE', payload: completedIds });
    }
  }, [state.todos]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Advanced Todo App</h1>
          <p className="text-gray-600">React Interview Demo - Professional Structure</p>
        </div>

        <StatsPanel stats={stats} />
        
        <div className="mb-8">
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search todos..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={state.filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              {stats.completed > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Clear Completed
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {state.searchTerm ? 'No todos match your search' : 'No todos yet. Add one above!'}
              </div>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider value={{}}>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;