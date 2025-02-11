import { useState } from "react";

function Todo(props) {
  const [isEditting, setEditting] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditting(false);
  }

  const edittingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={props.id} className="todo-label">
          New name for {props.name}
        </label>
        <input
          id={props.id}
          type="text"
          className="todo-text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn-todo-cancel" onClick={() => setEditting(false)}>
          Cancel{" "}
          <span className="visually-hidden"> remaining {props.name}</span>
        </button>

        <button type="submit" className="btn btn__primary btn-todo-edit">
          Save{" "}
          <span className="visually-hidden"> New name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          type="checkbox"
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label htmlFor={props.id} className="todo-label">
          {props.name}
        </label>
      </div>

      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditting(true)}>
          Edit <span className="visually-hidden"> {props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          delete <span className="visually-hidden"> {props.name}</span>
        </button>
      </div>
    </div>
  );
  return (
    <li className="todo">{isEditting ? edittingTemplate : viewTemplate}</li>
  );
}

export default Todo;
