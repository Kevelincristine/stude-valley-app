import { useState, useEffect } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'
import { AddTaskForm } from './components/addTaskForm'
import { NavBar } from './components/NavBar'
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
  const [view, setView] = useState('plantar');

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
    <div className="min-h-screen bg-background pb-12">
      {/* NOVO MENU: Substitui o cabeçalho antigo */}
      <NavBar currentView={view} setCurrentView={setView} />

      {/* CONTAINER DO GRID RESPONSIVO */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start p-4 sm:p-6 md:p-8">
        
        {/* LADO ESQUERDO: Level e Garden (Sempre visíveis no PC) */}
        <aside className="flex flex-col gap-4 md:gap-6 lg:sticky lg:top-24 w-full">
          <LevelBar tasks={tasks} />
          <Garden level={currentLevel} /> 
        </aside>

        {/* LADO DIREITO: Muda baseado no que foi clicado no menu */}
        <main className="flex flex-col gap-6 w-full">
          
          {/* SE A TELA FOR "PLANTAR TAREFA" */}
          {view === 'plantar' && (
            <>
              <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
                <AddTaskForm onAddTask={addTask} />
              </div>

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
            </>
          )}

          {/* SE A TELA FOR "ESTATÍSTICAS" */}
          {view === 'estatisticas' && (
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm text-center">
              <h2 className="text-xl font-bold text-font mb-2">📊 Estatísticas da Fazenda</h2>
              <p className="text-segund text-sm">Em breve: gráficos das suas colheitas de conhecimento!</p>
            </div>
          )}

          {/* SE A TELA FOR "CONFIGURAÇÕES" */}
          {view === 'configuracoes' && (
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm text-center">
              <h2 className="text-xl font-bold text-font mb-2">⚙️ Configurações</h2>
              <p className="text-segund text-sm">Em breve: personalização de som, modo escuro e mais!</p>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

export default App;