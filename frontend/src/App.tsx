import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5005/api/tasks').then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAdd={task => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
