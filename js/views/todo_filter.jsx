import React from 'react';

var LINKS = ['Uncompleted', 'All', 'Completed'],
    LINK_CLASS = 'todo-filter__link',
    SELECTED_CLASS = `${LINK_CLASS} ${LINK_CLASS}--selected`;

export default React.createClass({
  getInitialState() {
    return {selected: 'Uncompleted'};
  },
  render() {
    var selected = this.state.selected;
    return (
      <div className="todo-filter">
        {LINKS.map(text => {
          return <a href="#"
                    key={text}
                    onClick={this._applyFilter.bind(this, text)}
                    className={selected === text ? SELECTED_CLASS : LINK_CLASS}>
                    {text}
                 </a>;
        })}
      </div>
    );
  },
  _applyFilter(text, event) {
    event.preventDefault();
    this.props.onFilter(text);
    this.setState({selected: text});
  }
});
