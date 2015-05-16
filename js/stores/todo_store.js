'use strict';

import constants from '../constants/todo_constants';
import events from 'events';
import Immutable from 'immutable';
import Protomatter from 'protomatter';

var EventEmitter = events.EventEmitter,
    IMap = Immutable.Map,
    instance;

var ACTION_MAP = {
  [constants.TODO_CREATE]: 'create'
};

export default Protomatter.compose(EventEmitter.prototype, {
  init(dispatcher) {
    // TODO: Why do I need to bind here? Protomatter should take care of it.
    this.dispatchToken = dispatcher.register(this.processAction.bind(this));
    this.todos = new IMap();
  },
  // Public Methods:
  all() {
    return this.todos;
  },
  get(id) {

  },
  // Static methods:
  createInstance(dispatcher) {
    if (!instance) {
      instance = this.create(dispatcher);
    }
  },
  getInstance() {
    return instance;
  },
  // Private methods;
  private: {
    create(action) {
      var newTodos = action.todos,
          todos = this.todos,
          todoMap = {};
      for (var todo of newTodos) {
        todoMap[todo.id] = Immutable.fromJS(todo);
      }
      this.todos = todos.merge(todoMap);
    },
    processAction(action) {
      var handlerName = ACTION_MAP[action.type],
          handler = this[handlerName];
      if (typeof handler === 'function') {
        handler(action);
        this.emit('change');
      }
    }
  }
});
