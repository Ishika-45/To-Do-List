import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck } from 'react-icons/fa';

const TaskList = ({ tasks, toggleComplete, removeTask, darkMode }) => {
  return (
    <div className="mt-4 space-y-2">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex justify-between items-center px-4 py-2 rounded-md shadow-md ${
            task.completed
              ? (darkMode? 'bg-green-700/60':'bg-green-400')
              :(darkMode ? 'bg-gray-700/70' : 'bg-white')
          }`}
        >
          <span className={`${task.completed ? (darkMode?'line-through text-gray-300':'line-through text-gray-500') : (darkMode?'text-gray':'text-black')}`}>
            {task.text}
          </span>
          <div className="flex gap-3">
            <button onClick={() => toggleComplete(task.id)}className={`cursor-pointer ${task.completed ? (darkMode?'text-white':'text-white'):(darkMode?'text-green-600':'text-green-300')} `}>
              <FaCheck />
            </button>
            <button onClick={() => removeTask(task.id)} className={(darkMode?'text-red-600 cursor-pointer':'text-red-400 cursor-pointer')}>
              <FaTrash />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default TaskList;