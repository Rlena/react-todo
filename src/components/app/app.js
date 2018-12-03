import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
  };

  deleteItem = (id) => {
    // деструктурируем todoData из state
    this.setState(({ todoData }) => {

      // получаем индекс элемента, кот. будем удалять
      const idx = todoData.findIndex((el) => el.id === id);
      todoData.splice(idx, 1);

      // схема удаления элмента из массива, без изменения существующего массива
      // [a, b, c, d, e]
      // [a, b,    d, e]

      // slice не изменяет существующий массив, он просто копирует элементы (создается новый массив с оставшимися эл.)
      // получаем элементы до удаленного и после удаленного элемента
      // удаляем элементы от 0 до удаляемого индекса - todoData.slice(0, idx)
      // удаляем элементы от места удаляемый индекс + 1, потому что удаленный индекс пропадает,
      // и до конца массива - todoData.slice(idx + 1)

      // новый массив из элементов, до нужного элемента и после нужного
      // новый массив без того элемента который мы удалили
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      // возвращаем новое состояние
      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    // нужно сформировать объект, подобный объекту из массива
    // сгенерировать уникальный id
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    };

    // добавить новый item в массив
    this.setState(({ todoData }) => {

      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      }
    });
  };

  // передаем функции id элемента, который сменил свой статус с important на не important
  onToggleImportant = (id) => {
    console.log('Toggle Important', id);
  };

  // передаем функции id элемента, который сменил свой статус с done на не done
  onToggleDone = (id) => {
    console.log('Toggle Done', id);
  };

  render() {

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};