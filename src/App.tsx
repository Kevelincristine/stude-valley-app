import { useState } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'
import { AddTaskForm } from './components/addTaskForm'
import { LevelBar } from './components/LevelBar'

const INITIAL_TASKS = [
  { id: 1, title: "Usar o StudeValley!", category: "Usuário", difficulty: "cobre", isDone: false },
];

function App() {
  
const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  function addTask(title: string, category: string, difficulty: "cobre" | "prata" | "ouro") {
    const newTask = {
      id: Math.random(), 
      title: title,
      category: category,
      difficulty: difficulty,
      isDone: false
    };

    setTasks([newTask, ...tasks]); 
  }

  function toggleTask(id: number) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ));
  }

 
  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
      


    <div className="min-h-screen p-8 bg-background">
      <header className="flex justify-between items-center border-b border-primary pb-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-font">Stude<span className="text-primary ml-1">Valley</span> 🌱</h1>
          <p className="text-segund font-medium">Suas plantações de conhecimento</p>
        </div>
      </header>
      <LevelBar tasks={tasks} />
       
      <main className="max-w-2xl mx-auto">
      
        <AddTaskForm onAddTask={addTask} />

        <div className="flex flex-col gap-4">
          {tasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title}
              isDone={task.isDone}
              category={task.category}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              dificulty={task.difficulty as any} 
            />
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-font opacity-50 mt-10">Sua fazenda está vazia... Comece a plantar! ✨</p>
        )}
      </main>
    </div>
  );
}

export default App;