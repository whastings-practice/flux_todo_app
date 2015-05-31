import React from 'react';
import validateTodo from '../util/validate_todo';

export default React.createClass({
  getDefaultProps() {
    return {
      buttonText: 'Save',
      data: {},
      formTitle: 'Edit Todo'
    };
  },

  getInitialState() {
    var data = this.props.data;
    return {
      errors: [],
      title: data.title || ''
    };
  },

  render() {
    var errors = this.state.errors,
        formTitle = this.props.formTitle,
        title = this.state.title,
        buttonText = this.props.buttonText,
        renderedErrors = '';

    if (errors.length) {
      renderedErrors = renderErrors(errors);
    }

    return (
      <form className="todo-list__form" onSubmit={this._save}>
        <h2>{formTitle}</h2>
        {renderedErrors}
        <label htmlFor="title-input">Title</label>
        <input type="text"
               id="title-input"
               placeholder="Title"
               ref="titleInput"
               value={title}
               onChange={this._updateForm}/>
        <button className="btn">{buttonText}</button>
        <button className="btn" type="button" onClick={this.props.onClose}>
          Cancel
        </button>
      </form>
    );
  },

  _save(event) {
    var shouldResetState,
        close = this.props.onClose,
        todo = dataFromRefs(this.refs),
        errors = validateTodo(todo);
    event.preventDefault();

    if (errors.length) {
      return this.setState({errors});
    }

    shouldResetState = this.props.onSave(todo);
    if (shouldResetState) {
      this.setState(this.getInitialState());
    }

    close();
  },

  _updateForm() {
    this.setState(dataFromRefs(this.refs));
  }
});

function dataFromRefs(refs) {
  return {
    title: refs.titleInput.getDOMNode().value
  };
}

function renderErrors(errors) {
  return (
    <div className="todo-list__form__errors">
      <h3>Error</h3>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
    </div>
  );
}
