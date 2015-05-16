import Immutable from 'immutable';
import React from 'react';

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
    var todos = this.state.todos.toArray();
    return (
      <div className="todos">
        <h1>Your Todos</h1>
        <ul className="todos-list">
          {todos.map(todo => {
            return <li key={todo.get('id')}>{todo.get('title')}</li>
          })}
        </ul>
      </div>
    );
  },
  _update() {
    var todos = this.props.store.all();
    this.setState({todos});
  }
});
