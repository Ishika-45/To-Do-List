import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = ({ addTask, tasks , darkMode }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Task cannot be empty!');
      return;
    }
    if (tasks.some(task => task.text === text.trim())) {
      toast.error('Task already exists!');
      return;
    }
    addTask({ id: uuidv4(), text: text.trim(), completed: false, date: new Date().toISOString() });
    setText('');
    toast.success('Task added!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Add a new task..."
        style={{
          backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255, 255, 255, 1)',
          color: darkMode ? 'white' : '#000',
          fontWeight: '500',
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
        }}
      />
      <button type="submit" className="cursor-pointer text-white px-4 rounded-md" style={{backgroundColor:darkMode?'#191970':'#1E90FF'}}>Add</button>
    </form>
  );
};

export default TaskInput;