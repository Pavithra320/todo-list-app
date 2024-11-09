import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);  // State to store the tasks
  const [newTask, setNewTask] = useState('');  // State to handle the input for a new task

  // Fetch tasks from the Flask API when the component loads
  useEffect(() => {
    fetch('http://localhost:5000/tasks')  // Full URL to the Flask server
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data);  // For debugging
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask) {
      // Post the new task to the Flask API
      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTask })
      })
      .then(response => response.json())
      .then(task => {
        setTasks([...tasks, task]);  // Add the new task to the list
        setNewTask('');  // Clear the input field
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* Input for adding a new task */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {/* Display the list of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
