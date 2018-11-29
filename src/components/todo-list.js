import React from 'react';
import TodoListItem from './todo-list-item';

const TodoList = ( { todos } ) => {

  const elements = todos.map((item) => {

    // itemProps - rest-параметр, в который войдут все свойства объекта item, кроме id
    // id был деструктурирован в выражении
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <TodoListItem {...itemProps} />
      </li>
    );
  });

  return (
    <ul>
      { elements }
    </ul>
  );
};

export default TodoList;