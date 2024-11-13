import React from 'react';

const Task = ({ task, onUpdateStatus, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdateStatus(task.id, e.target.value);
  };

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
        <label>Status: </label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
