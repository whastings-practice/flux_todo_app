import dispatcher from './app_dispatcher';
import localStorageApi from './util/localstorage_api';
import React from 'react';
import todoActions from './actions/todo_actions';
import TodoApp from './views/todo_app.jsx';
import TodoStore from './stores/todo_store';

var outputEl = document.getElementById('output'),
    persistence = localStorageApi(),
    actions = todoActions(persistence),
    store;

TodoStore.createInstance(dispatcher);
store = TodoStore.getInstance();

React.render(<TodoApp actions={actions} store={store}/>, outputEl);


actions.loadAll();
