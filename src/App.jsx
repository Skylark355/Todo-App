import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilteredButton from "./components/FilterButton";
import { nanoid } from "nanoid";

const Filter_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(Filter_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    // console.log(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function addTask(name) {
    const newTask = { id: `todo-${nanoid}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Edit function

  function editTask(id, newName) {
    const edittedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(edittedTaskList);
  }

  //end of edit function

  const taskList = tasks
  .filter(Filter_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filteredList = FILTER_NAMES.map((name) => (
    <FilteredButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length <= 1 ? "task" : "tasks";

  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo Matic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception"> {filteredList}</div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
export default App;
