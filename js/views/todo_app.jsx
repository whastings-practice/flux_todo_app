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
    return {currentFilter: 'Uncompleted', isShowingForm: false, todos: new IMap()};
  },

  render() {
    var todos = this.state.todos,
        actions = this.props.actions,
        currentFilter = this.state.currentFilter,
        isShowingForm = this.state.isShowingForm;

    return (
      <div className="todo-list-app">
        <h1>Your Todos</h1>
        {isShowingForm ?
          <TodoForm
            onSave={this._createTodo} buttonText="Add"
            formTitle="Add Todo" onClose={this._closeShowForm}/> :
          <button type="button" className="btn" onClick={this._showAddForm}>
            Add New
          </button>
        }
        <TodoList items={todos} actions={actions} filter={currentFilter}/>
        <TodoFilter onFilter={this._addFilterClass}/>
      </div>
    );
  },

  _addFilterClass(filter) {
    this.setState({currentFilter: filter});
  },

  _closeShowForm() {
    this.setState({isShowingForm: false});
  },

  _createTodo(data) {
    this.props.actions.create(data);
    return true;
  },

  _showAddForm() {
    this.setState({isShowingForm: true});
  },

  _update() {
    var todos = this.props.store.all();
    this.setState({todos});
  }
});
