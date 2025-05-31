const ProgressBar = ({ tasks, darkMode }) => {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="my-4">
      <div className="w-full h-3 rounded-full"
      style={{
        backgroundColor: darkMode ? '#333' : '#f0f0f0',
        overflow: 'hidden',
        transition: 'background-color 0.8s ease-in-out',
      }}>
        <div
          className="h-3 rounded-full transition-all"
          style={{
            width: `${percent}%`,
            backgroundColor:darkMode ? '#191970' : '#1E90FF',
          }}
        ></div>
      </div>
      <p className="text-sm mt-1 text-center font-bold" style={{color:darkMode?'white':'black'}}>
        {completed} of {total} tasks completed ({percent}%)
      </p>
    </div>
  );
};

export default ProgressBar;
