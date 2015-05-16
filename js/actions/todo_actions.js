import dispatcher from '../app_dispatcher';
import constants from '../constants/todo_constants';
import cuid from 'cuid';

export default {
  create(todo) {
    todo.id = cuid();
    dispatcher.dispatch({
      type: constants.TODO_CREATE,
      todos: [todo]
    });
  },
  createMultiple(todos) {
    dispatcher.dispatch({
      type: constants.TODO_CREATE,
      todos
    });
  }
};
