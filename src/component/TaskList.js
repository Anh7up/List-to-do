import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks, onEdit, onDelete, onCheck }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <li
          id="check-box"
          key={task.id}
          className={task.done ? "task-done" : ""}
        >
          <label htmlFor="task-name">{task.name}</label>
          <label htmlFor="task-time">{task.time}</label>
          <div id="action">
            <button id="edit" onClick={() => onEdit(task)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button id="delete" onClick={() => onDelete(task)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <input
              type="checkbox"
              onChange={() => onCheck(task.id)}
              checked={task.done}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
