import React, { createContext, useContext } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children, value }) => {
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};