import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      buttonText: 'Save',
      data: {}
    };
  },
  getInitialState() {
    var data = this.props.data;
    return {
      title: data.title || ''
    };
  },
  render() {
    var title = this.state.title,
        buttonText = this.props.buttonText;
    return (
      <form className="todo-list__form" onSubmit={this._save}>
        <label>
          Title: <input type="text" ref="titleInput" value={title} onChange={this._updateForm}/>
        </label>
        <button>{buttonText}</button>
      </form>
    );
  },
  _save(event) {
    var shouldResetState;
    event.preventDefault();
    shouldResetState = this.props.onSave(dataFromRefs(this.refs));
    if (shouldResetState) {
      this.setState(this.getInitialState());
    }
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
