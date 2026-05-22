import { useState, useEffect } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'
import { AddTaskForm } from './components/addTaskForm'
import { LevelBar } from './components/LevelBar'
import { AnimatePresence } from 'framer-motion'
import { Garden } from './components/Garden'

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

  // --- REVISÃO DA LÓGICA DE XP E NÍVEL ---
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
    const newTask: Task = { 
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
    // Ajustado o padding: p-4 no celular para ganhar espaço e p-8 no PC
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-background transition-all">
      
      {/* HEADER: Ajustado padding e margem para telas menores */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-primary pb-4 mb-6 md:mb-8 text-center sm:text-left gap-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-font">Stude<span className="text-primary ml-1">Valley</span> 🌱</h1>
          <p className="text-segund text-sm md:text-base font-medium">Seus esforços ganhando vida</p>
        </div>
      </header>

      {/* GRID RESPONSIVO: 
          - No mobile (padrão): 1 coluna (`grid-cols-1`), espaçamento menor (`gap-6`)
          - No PC (`lg:`): 2 colunas com o Garden na esquerda (`lg:grid-cols-[320px_1fr]`), espaçamento maior (`gap-8`) 
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
        
        {/* BARRA LATERAL (Esquerda no PC, Topo no Mobile):
            - `lg:sticky lg:top-8`: Só fica grudado se for tela grande. No celular ele flui normalmente.
        */}
        <aside className="flex flex-col gap-4 md:gap-6 lg:sticky lg:top-8 w-full">
          <LevelBar tasks={tasks} />
          <Garden level={currentLevel} /> 
        </aside>

        {/* CONTEÚDO PRINCIPAL (Direita no PC, Baixo no Mobile): */}
        <main className="flex flex-col gap-4 md:gap-6 w-full">
          {/* Caixa do Formulário */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
            <AddTaskForm onAddTask={addTask} />
          </div>

          {/* Lista de Tarefas */}
          <div className="flex flex-col gap-3 md:gap-4">
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
              <p className="text-center text-font opacity-50 mt-8 md:mt-10 italic text-sm md:text-base">
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