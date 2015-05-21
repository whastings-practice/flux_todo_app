import React from 'react';
import ReactAddons from 'react/addons';

var PureRenderMixin = ReactAddons.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],
  render() {
    var todo = this.props.todo,
        classes = 'todo-list__item',
        completed = todo.get('completed');

    if (completed) {
      classes += ' todo-list__item--completed';
    } else {
      classes += ' todo-list__item--uncompleted';
    }

    return (
      <li className={classes}>
        <input type="checkbox" checked={completed} onChange={this._toggleCompleted}/>
        {todo.get('title')}
      </li>
    );
  },
  _toggleCompleted() {
    var todo = this.props.todo,
        completed = !todo.get('completed'),
        actions = this.props.actions;

    actions.update(todo.toJS(), {completed});
  }
});
