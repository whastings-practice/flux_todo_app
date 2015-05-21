import TodoListItem from './todo_list_item.jsx';
import React from 'react';

var LIST_CLASS = 'todo-list';

export default React.createClass({
  render() {
    var todos = this.props.items.toArray(),
        actions = this.props.actions,
        filter = this.props.filter.toLowerCase(),
        classes = `${LIST_CLASS} ${LIST_CLASS}--${filter}`;

    return (
      <ul className={classes}>
        {todos.map(todo => {
          return <TodoListItem todo={todo} key={todo.get('id')} actions={actions}/>;
        })}
      </ul>
    );
  }
});
