import React from 'react';

export default React.createClass({
  render() {
    var todo = this.props.todo;
    return <li className="todo-list__item">{todo.get('title')}</li>;
  }
});
