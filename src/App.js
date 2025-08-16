import { useState, useEffect } from "react";
import FormAddTask from "./component/FormAddtask";
import FormEdit from "./component/FormEdit";
import Header from "./component/Header";
import TaskList from "./component/TaskList";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [PopUpForm, setPopUpForm] = useState(false);
  const [PopUpEdit, setPopUpEdit] = useState(false);
  const [taskEditing, setTaskEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("a-z");

  // Local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Sort
  function sortTasks(taskList, option) {
    return taskList
      .slice()
      .sort((a, b) =>
        option === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }

  // Search
  const findTask = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add task
  function addTask(task) {
    const newTasks = [...tasks, { ...task, done: false }];
    setTasks(sortTasks(newTasks, sortOption));
  }

  // Update task
  function updateTask(taskUpdate) {
    const updated = tasks.map((t) => (t.id === taskUpdate.id ? taskUpdate : t));
    setTasks(sortTasks(updated, sortOption));
  }

  // Option Sort
  function handleSortChange(option) {
    setSortOption(option);
    setTasks(sortTasks(tasks, option));
  }

  // Deleted
  function handleDeleteTask(taskDeleted) {
    const updated = tasks.filter((t) => t.id !== taskDeleted.id);
    setTasks(sortTasks(updated, sortOption));
  }

  // Search
  function handleSearch(query) {
    setSearchQuery(query);
  }

  // Check done
  function handleCheckTask(id) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(sortTasks(updated, sortOption));
  }

  return (
    <>
      <Header
        tasks={tasks}
        onOpenAddForm={() => setPopUpForm(true)}
        onChange={handleSortChange}
        onSearch={handleSearch}
      />
      {tasks.length === 0 && <div id="no-task">NO TASK</div>}

      <TaskList
        tasks={findTask}
        onEdit={(task) => {
          setPopUpEdit(true);
          setTaskEditing(task);
        }}
        onDelete={handleDeleteTask}
        onCheck={handleCheckTask}
      />

      {PopUpForm && (
        <FormAddTask onAdd={addTask} onCancel={() => setPopUpForm(false)} />
      )}

      {PopUpEdit && (
        <FormEdit
          task={taskEditing}
          onUpdate={updateTask}
          onCancel={() => setPopUpEdit(false)}
        />
      )}
    </>
  );
}
