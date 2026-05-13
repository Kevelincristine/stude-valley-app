import { useState, useEffect } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'
import { AddTaskForm } from './components/addTaskForm'
import { LevelBar } from './components/LevelBar'
import { AnimatePresence } from 'framer-motion'

// 1. A INTERFACE FICA AQUI FORA
interface Task {
  id: number;
  title: string;
  category: string;
  difficulty: "cobre" | "prata" | "ouro";
  isDone: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Usar o StudeValley!", category: "Usuário", difficulty: "cobre", isDone: false },
];

function App() {
  // 2. AVISAMOS O USESTATE QUE ELE É UMA LISTA DE TASKS: <Task[]>
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('@StudeValley:tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('@StudeValley:tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title: string, category: string, difficulty: "cobre" | "prata" | "ouro") {
    const newTask: Task = { // Tipamos a nova task também
      id: Math.random(), 
      title,
      category,
      difficulty,
      isDone: false
    };
    setTasks([newTask, ...tasks]); 
  }

  function toggleTask(id: number) {
    setTasks(tasks.map((task: Task) => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task: Task) => task.id !== id));
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
    
          <AnimatePresence mode="popLayout"> 
            {tasks.map((task: Task) => (
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
          </AnimatePresence>
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-font opacity-50 mt-10 italic">
            Sua fazenda está vazia... Comece a plantar! ✨
          </p>
        )}
      </main>
    </div>
  );
}

export default App;