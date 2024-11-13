import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newTask),
    });
    fetchTasks(); // Refresh tasks
  };

  const handleUpdateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchTasks(); // Refresh tasks
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchTasks(); // Refresh tasks
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <TaskForm onAddTask={handleAddTask} />
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
