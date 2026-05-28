import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

// Importação dos componentes do projeto
import { TaskCard } from './components/taskCard';
import { AddTaskForm } from './components/addTaskForm';
import { LevelBar } from './components/LevelBar';
import { Garden } from './components/Garden';
import { NavBar } from './components/NavBar';

// Definição da estrutura de uma Tarefa (Task)
interface Task {
  id: number;
  title: string;
  category: string;
  difficulty: "cobre" | "prata" | "ouro";
  isDone: boolean;
}

// Tarefa inicial para o usuário não abrir o site com a lista vazia
const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Usar o StudeValley!", category: "Usuário", difficulty: "cobre", isDone: false },
];

function App() {
  // Estado que armazena a lista de tarefas, buscando do LocalStorage se existir
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('@StudeValley:tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return INITIAL_TASKS;
  });
  
  // Estado para controlar a aba atual do menu ("plantar", "estatisticas", "configuracoes")
  const [view, setView] = useState('plantar');
  
  // Estado booleano que controla a visibilidade do formulário de adicionar tarefas
  const [isFormVisible, setIsFormVisible] = useState(false);

  // --- LÓGICA DE SISTEMA DE EXPERIÊNCIA (XP) E NÍVEL ---
  // Calcula o XP total somando apenas as tarefas marcadas como concluídas (isDone: true)
  const totalXP = tasks.reduce((acc, task) => {
    if (!task.isDone) return acc;
    const points = { cobre: 10, prata: 50, ouro: 100 };
    return acc + (points[task.difficulty as keyof typeof points] || 0);
  }, 0);

  // Calcula o nível atual com base no XP acumulado (cada nível exige 100 XP a mais que o anterior)
  let currentLevel = 1;
  let xpTemp = totalXP;
  let xpRequired = 100;

  while (xpTemp >= xpRequired) {
    xpTemp -= xpRequired;
    currentLevel++;
    xpRequired += 100;
  }

  // Efeito colateral para salvar automaticamente as tarefas no LocalStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('@StudeValley:tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Função para criar e adicionar uma nova tarefa no topo da lista
  function addTask(title: string, category: string, difficulty: "cobre" | "prata" | "ouro") {
    const newTask: Task = { 
      id: Math.random(), 
      title,
      category,
      difficulty,
      isDone: false
    };
    setTasks([newTask, ...tasks]); 
    
    // Fecha o formulário automaticamente assim que a tarefa é plantada
    setIsFormVisible(false);
  }

  // Função para alternar o estado de conclusão (checked/unchecked) de uma tarefa
  function toggleTask(id: number) {
    setTasks(tasks.map((task: Task) => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ));
  }

  // Função para remover uma tarefa da lista pelo ID
  function deleteTask(id: number) {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  }

  return (
    <div className="min-h-screen bg-background pb-12 transition-all">
      {/* MENU SUPERIOR (NAVBAR): 
          Controla a navegação e abre o formulário se a aba selecionada for 'plantar' */}
      <NavBar 
        currentView={view} 
        setCurrentView={(novaView) => {
          setView(novaView);
          if (novaView === 'plantar') {
            setIsFormVisible(true);
          }
        }} 
      />

      {/* CONTAINER DO LAYOUT RESPONSIVO (GRID):
          - No mobile: Empilha tudo em 1 coluna (grid-cols-1) com menor espaçamento (gap-6)
          - No computador (lg:): Divide em 2 colunas, deixando a esquerda com 320px fixos */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start p-4 sm:p-6 md:p-8">
        
        {/* COLUNA DA ESQUERDA: Status do jogador (LevelBar e Garden/Estufa)
            - lg:sticky e lg:top-24 fazem o bloco fixar na tela ao rolar a página apenas no computador */}
        <aside className="flex flex-col gap-4 md:gap-6 lg:sticky lg:top-24 w-full">
          <LevelBar tasks={tasks} />
          <Garden level={currentLevel} /> 
        </aside>

        {/* COLUNA DA DIREITA: Conteúdo dinâmico baseado no menu */}
        <main className="flex flex-col gap-6 w-full">
          
          {/* ABA: PLANTAR TAREFA (Visualização principal) */}
          {view === 'plantar' && (
            <>
              {/* AnimatePresence monitora a entrada e saída do formulário para aplicar a animação */}
              <AnimatePresence>
                {isFormVisible && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-4 md:p-6 rounded-2xl border-2 border-primary/10 shadow-sm relative"
                  >
                    {/* Botão de fechar manual no canto superior direito */}
                    <button 
                      onClick={() => setIsFormVisible(false)}
                      className="absolute top-4 right-4 text-font opacity-40 hover:opacity-100 text-sm font-bold cursor-pointer transition-opacity"
                    >
                      ✕ Cancelar
                    </button>

                    <AddTaskForm onAddTask={addTask} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lista contendo os cards de tarefas cadastrados */}
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

                {/* Mensagem exibida caso o usuário limpe ou não tenha tarefas cadastradas */}
                {tasks.length === 0 && (
                  <p className="text-center text-font opacity-50 mt-8 md:mt-10 italic text-sm md:text-base">
                    Sua fazenda está vazia... Comece a plantar! ✨
                  </p>
                )}
              </div>
            </>
          )}

          {/* ABA: ESTATÍSTICAS */}
          {view === 'estatisticas' && (
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm text-center animate-fadeIn">
              <h2 className="text-xl font-bold text-font mb-2">📊 Estatísticas da Fazenda</h2>
              <p className="text-segund text-sm">Em breve: gráficos das suas colheitas de conhecimento!</p>
            </div>
          )}

          {/* ABA: CONFIGURAÇÕES */}
          {view === 'configuracoes' && (
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm text-center animate-fadeIn">
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