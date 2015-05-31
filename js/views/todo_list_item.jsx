import React from 'react';
import ReactAddons from 'react/addons';
import TodoForm from './todo_form.jsx';

var PureRenderMixin = ReactAddons.addons.PureRenderMixin;

var ITEM_CLASS = 'todo-list__item';

export default React.createClass({
  getInitialState() {
    return {isEditing: false};
  },

  mixins: [PureRenderMixin],

  render() {
    var todo = this.props.todo,
        isEditing = this.state.isEditing;

    return isEditing ?
      <li className={ITEM_CLASS}>
        <TodoForm data={todo.toJS()} onSave={this._update} onClose={this._endEdit}/>
      </li> :
      this._renderTodo();
  },

  _destroy() {
    this.props.actions.remove(this.props.todo.toJS());
  },

  _edit() {
    this.setState({isEditing: true});
  },

  _endEdit() {
    this.setState({isEditing: false});
  },

  _renderTodo() {
    var todo = this.props.todo,
        classes = ITEM_CLASS,
        completed = todo.get('completed');

    if (completed) {
      classes += ` ${ITEM_CLASS}--completed`;
    } else {
      classes += ` ${ITEM_CLASS}--uncompleted`;
    }

    return (
      <li className={classes}>
        <input type="checkbox" checked={completed} onChange={this._toggleCompleted}/>
        {todo.get('title')}
        <a href="#" onClick={this._edit} className={`${ITEM_CLASS}__edit-link`}>
          Edit
        </a>
        <button onClick={this._destroy} type="button" className={`${ITEM_CLASS}__delete-btn`}>
          <span className="delete-icon" aria-hidden="true">✖</span>
          <span className={`${ITEM_CLASS}__delete-btn__text`}>Delete</span>
        </button>
      </li>
    );
  },

  _toggleCompleted() {
    var todo = this.props.todo,
        completed = !todo.get('completed'),
        actions = this.props.actions;

    actions.update(todo.toJS(), {completed});
  },

  _update(updates) {
    var todo = this.props.todo,
        actions = this.props.actions;

    actions.update(todo.toJS(), updates);
    this.setState({isEditing: false});
  }
});
