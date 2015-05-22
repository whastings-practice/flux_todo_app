'use strict';

import closureType from 'closure-type';
import constants from '../constants/todo_constants';
import events from 'events';
import Immutable from 'immutable';

var EventEmitter = events.EventEmitter,
    IMap = Immutable.Map,
    instance;

var todoStoreType = closureType(function(self, api, initArgs) {
  var ACTION_MAP = {
    [constants.TODO_CREATE]: create,
    [constants.TODO_REMOVE]: remove,
    [constants.TODO_UPDATE]: update
  };

  initArgs(function(dispatcher) {
    self.dispatchToken = dispatcher.register(processAction);
    self.todos = new IMap();
  })();

  closureType.extend(api, {
    all() {
      return self.todos;
    }
  });

  function create(action) {
    var newTodos = action.todos,
        todos = self.todos,
        todoMap = {};
    for (var todo of newTodos) {
      todoMap[todo.id] = Immutable.fromJS(todo);
    }
    self.todos = todos.merge(todoMap);
  }

  function processAction(action) {
    var handler = ACTION_MAP[action.type];
    if (typeof handler === 'function') {
      handler(action);
      api.emit('change');
    }
  }

  function remove(action) {
    var todo = action.todo;
    self.todos = self.todos.delete(todo.id);
  }

  function update(action) {
    var todo = action.todo;
    self.todos = self.todos.set(todo.id, Immutable.fromJS(todo));
  }
}, [EventEmitter.prototype]);

export default {
  createInstance(dispatcher) {
    if (!instance) {
      instance = todoStoreType(dispatcher);
    }
  },
  getInstance() {
    return instance;
  }
};
