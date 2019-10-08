import React from 'react';
import {
  Divider,
} from "semantic-ui-react";
import TodoForm from '@/components/Form'
import TodoList from '@/components/List';
import TodoFilters from '@/components/Filters';

const TodoApp = () => {
  return (
    <>
      <TodoForm />
      <TodoFilters />
    <Divider />
    <TodoList />
  </> 
  )
}

export default TodoApp
