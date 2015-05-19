import Immutable from 'immutable';
import React from 'react';
import TodoForm from './todo_form.jsx';
import TodoList from './todo_list.jsx';

var IMap = Immutable.Map;

export default React.createClass({
  componentDidMount() {
    this.props.store.on('change', this._update);
  },
  componentWillUnmount() {
    this.props.store.removeListener('change', this._update);
  },
  getInitialState() {
    return {todos: new IMap()};
  },
  render() {
    var todos = this.state.todos;
    return (
      <div className="todos">
        <h1>Your Todos</h1>
        <TodoForm onSave={this._createTodo}/>
        <TodoList items={todos}/>
      </div>
    );
  },
  _createTodo(data) {
    this.props.actions.create(data);
    return true;
  },
  _update() {
    var todos = this.props.store.all();
    this.setState({todos});
  }
});
