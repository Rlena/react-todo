import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css'

const TodoList = ({ todos, onDeleted,
                     onToggleImportant,
                     onToggleDone }) => {

  const elements = todos.map((item) => {

    // itemProps - rest-параметр, в который войдут все свойства объекта item, кроме id (label и important)
    // id был деструктурирован в выражении
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;