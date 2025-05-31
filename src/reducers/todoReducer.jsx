export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
          priority: action.payload.priority || 'medium',
          category: action.payload.category || 'general',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload
      };
    case 'BULK_DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id))
      };
    default:
      return state;
  }
};