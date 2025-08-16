import {useState} from "react"

export default function FormEdit({ task, onUpdate, onCancel }) {
  const [valueName, setValuename] = useState(task.name);
  const [valueTime, setValueTime] = useState(task.time);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!valueName.trim()){
      alert('Enter name task')
      return;
    };
    if (!valueTime.trim()){
      alert('Enter time task')
      return;
    };
    onUpdate({...task, name: valueName, time: valueTime});
    onCancel();
  }
  return (
    <>
      <form id="edit-form" onSubmit={handleSubmitEdit}>
        <h2>Form edit task</h2>
        <div className="name-list">
          <label htmlFor="edit-value-name" className="name-task">
            Name task:{" "}
          </label>
          <input
            value={valueName}
            onChange={(e) => setValuename(e.target.value)}
            type="text"
            id="edit-value-name"
            placeholder="Please enter new name task"
          />
        </div>
        <div className="time-list">
          <label htmlFor="edit-value-time">Time:</label>
          <input
          value={valueTime}
          onChange={(e) => setValueTime(e.target.value)} 
          type="time" 
          id="edit-value-time" 
          name="time" 
          />
        </div>
        <div className="button-group">
          <button type="submit" id="submit-edit">
            UPDATE
          </button>
          <button type="button" id="cancel-edit" onClick={onCancel}>
            X
          </button>
        </div>
      </form>
    </>
  );
}
