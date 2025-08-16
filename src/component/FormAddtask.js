import { useState } from "react";

export default function FormAddTask({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()){
      alert('Enter name task')
      return;
      };
    if (!time.trim()){
      alert('Enter time task')
      return;
      };
    onAdd({ id: Date.now(), name, time });
    setName("");
    setTime("");
    onCancel();
  };

  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <h2>Form add task</h2> 
      <div className="name-list">
        <label>
          Name task:
          <input
            id="edit-value-name"
            placeholder="Please enter new name task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="time-list">
        <label>
          Time:
          <input
            id="edit-value-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
      </div>
      <div className="button-group">
        <button type="submit" id="submit-edit">
          SUBMIT
        </button>
        <button type="button" id="cancel-add" onClick={onCancel}>
          X
        </button>
      </div>
    </form>
  );
}
