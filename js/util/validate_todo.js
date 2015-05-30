var validators = [
  todo => todo.title.length > 0 ? '' : 'Todo must have a title'
];

export default function validateTodo(todo) {
  return validators
    .map(validator => validator(todo))
    .filter(error => error.length > 0);
}
