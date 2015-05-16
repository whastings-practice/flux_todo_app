import dispatcher from './app_dispatcher';
import mockData from '../mock_data.json';
import React from 'react';
import todoActions from './actions/todo_actions';
import TodoApp from './views/todo_app.jsx';
import TodoStore from './stores/todo_store';

var outputEl = document.getElementById('output'),
    store;

TodoStore.createInstance(dispatcher);
store = TodoStore.getInstance();

React.render(<TodoApp store={store}/>, outputEl);

todoActions.createMultiple(mockData);
