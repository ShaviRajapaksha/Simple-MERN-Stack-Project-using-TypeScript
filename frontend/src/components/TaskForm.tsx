import { useState } from 'react';
import type { Task } from '../types';
import axios from 'axios';

export default function TaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5005/api/tasks', { title });
    onAdd(res.data);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}
