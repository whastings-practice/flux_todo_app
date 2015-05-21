import TodoListItem from './todo_list_item.jsx';
import React from 'react';

export default React.createClass({
  render() {
    var todos = this.props.items.toArray(),
        actions = this.props.actions;
    return (
      <ul className="todos-list">
        {todos.map(todo => {
          return <TodoListItem todo={todo} key={todo.get('id')} actions={actions}/>;
        })}
      </ul>
    );
  }
});
