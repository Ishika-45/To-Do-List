import React, { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import useLocalStorage from './hooks/useLocalStorage';
import { Toaster } from 'react-hot-toast';
import { FaMoon, FaSun } from 'react-icons/fa';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const addTask = (task) => setTasks([...tasks, task]);
  const toggleComplete = (id) =>
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  const removeTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const backgroundImage = darkMode ? 'url("/dark-mode.png")' : 'url("/light-mode.jpg")';

  return (
   
    <div className="relative min-h-screen p-25 transition-all duration-700">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-0 overflow-hidden"
        style={{
          backgroundImage,
          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)', 
          transition: 'filter 0.7s ease-in-out, background-image 0.7s ease-in-out',
        }}
      ></div>

      <div className="relative z-10 h-auto" style={{color:darkMode?'gray':'white'}}>


        <Toaster />
        <div className="max-w-xl mx-auto rounded-lg p-4 backdrop-blur-sm" style={{backgroundColor:darkMode?'bg-black/50':'bg-white/20 ',border:darkMode?'1px solid white':'1px solid gray'}}>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-3xl font-bold text-center'>TO-DO LIST</h1>
            <button onClick={() => setDarkMode(!darkMode)} className='text-2xl cursor-pointer'>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          <TaskInput addTask={addTask} tasks={tasks} darkMode={darkMode}/>
          <ProgressBar tasks={tasks} darkMode={darkMode} />

          <div className='flex justify-around my-4'>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`cursor-pointer px-3 py-1 rounded-full ${filter === f
                    ?(darkMode?'bg-[#191970] text-white':'bg-[#1E90FF] text-white')
                    : (darkMode? 'bg-blue-200 text-black':'bg-gray-200 text-black')
                  }`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <TaskList
            tasks={filteredTasks}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default App;