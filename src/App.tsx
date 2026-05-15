import { useState, useEffect } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'
import { AddTaskForm } from './components/addTaskForm'
import { LevelBar } from './components/LevelBar'
import { AnimatePresence } from 'framer-motion'
import { Garden } from './components/Garden'

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
 
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('@StudeValley:tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return INITIAL_TASKS;
  });
  const totalXP = tasks.reduce((acc, task) => {
  if (!task.isDone) return acc;
  const points = { cobre: 10, prata: 50, ouro: 100 };
  return acc + (points[task.difficulty as keyof typeof points] || 0);
}, 0);

let currentLevel = 1;
let xpTemp = totalXP;
let xpRequired = 100;

while (xpTemp >= xpRequired) {
  xpTemp -= xpRequired;
  currentLevel++;
  xpRequired += 100;
}

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
    <div className="min-h-screen p-4 md:p-8 bg-background">
      {/* 1. HEADER: No topo, largura total */}
      <header className="max-w-7xl mx-auto flex justify-between items-center border-b border-primary pb-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-font">Stude<span className="text-primary ml-1">Valley</span> 🌱</h1>
          <p className="text-segund font-medium">Suas plantações de conhecimento</p>
        </div>
      </header>

      {/* 2. CONTAINER DO GRID: Coluna esquerda e direita */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start">
        
        {/* LADO ESQUERDO: Level e Garden */}
        <aside className="flex flex-col gap-6 sticky top-8">
          <LevelBar tasks={tasks} />
          {/* Aqui você pode renomear para Greenhouse se mudar o componente */}
          <Garden level={currentLevel} /> 
        </aside>

        {/* LADO DIREITO: Form e Tasks */}
        <main className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
             <h2 className="text-lg font-bold text-font mb-4">Nova Plantação</h2>
             <AddTaskForm onAddTask={addTask} />
          </div>

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

            {tasks.length === 0 && (
              <p className="text-center text-font opacity-50 mt-10 italic">
                Sua fazenda está vazia... Comece a plantar! ✨
              </p>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;
// Melhorias: 1° Dividir melhor os elementos na tela para que ambos tenham um bom espaço no celular e Pc 2° Arrumar os bugs de espaçamentos e revisar a lógica.