import React from "react";
import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";
import UndoRedoIcon from "./UndoRedoIcon";
import { connect } from 'react-redux'

const undoRedoIconsContainerStyle = {
  margin: "auto",
  top: 10,
  right: 0,
  position: "absolute",
  cursor: "pointer"
};

let Header = ({ addTodo, canUndo, canRedo, onUndo, onRedo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
    <div style={undoRedoIconsContainerStyle}>
    <UndoRedoIcon undo onClick={onUndo} disabled={!canUndo} />
      <UndoRedoIcon redo onClick={onRedo} disabled={!canRedo} />
    </div>
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch({type:'UNDO'}),
    onRedo: () => dispatch({type:'REDO'})
  }
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)

export default Header;

