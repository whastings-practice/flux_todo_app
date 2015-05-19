import React from 'react';
import ReactAddons from 'react/addons';

var PureRenderMixin = ReactAddons.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],
  render() {
    var todo = this.props.todo;
    return <li className="todo-list__item">{todo.get('title')}</li>;
  }
});
