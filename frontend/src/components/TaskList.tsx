import type { Task } from '../types';
import axios from 'axios';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: Props) {
  const toggleComplete = async (task: Task) => {
    const res = await axios.put(`http://localhost:5005/api/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const deleteTask = async (id?: string) => {
    await axios.delete(`http://localhost:5005/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => toggleComplete(task)}>Toggle</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
