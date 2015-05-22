'use strict';

import closureType from 'closure-type';
import cuid from 'cuid';

var STORAGE_KEY = 'flux_todo_app_data';

export default closureType(function localStorageApiType(self, api) {
  (function init() {
    self.todos = retrieveAll() || {};
  })();

  function create(todo) {
    todo.id = cuid();
    self.todos[todo.id] = todo;
    saveAll(self.todos);
    return Promise.resolve(todo);
  }

  function index() {
    return Promise.resolve(
      Object.keys(self.todos).map(key => self.todos[key])
    );
  }

  function remove(todo) {
    delete self.todos[todo.id];
    saveAll(self.todos);
    return Promise.resolve(todo);
  }

  function update(todo) {
    self.todos[todo.id] = todo;
    saveAll(self.todos);
    return Promise.resolve(todo);
  }

  closureType.extend(api, {create, index, remove, update});
});

function retrieveAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
