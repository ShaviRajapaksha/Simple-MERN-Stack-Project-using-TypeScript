import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (_: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
