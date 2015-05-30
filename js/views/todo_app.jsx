import Immutable from 'immutable';
import React from 'react';
import TodoFilter from './todo_filter.jsx';
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
    return {currentFilter: 'Uncompleted', todos: new IMap()};
  },
  render() {
    var todos = this.state.todos,
        actions = this.props.actions,
        currentFilter = this.state.currentFilter;
    return (
      <div className="todo-list-app">
        <h1>Your Todos</h1>
        <TodoForm onSave={this._createTodo} buttonText="Add" formTitle="Add Todo"/>
        <TodoList items={todos} actions={actions} filter={currentFilter}/>
        <TodoFilter onFilter={this._addFilterClass}/>
      </div>
    );
  },
  _addFilterClass(filter) {
    this.setState({currentFilter: filter});
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
