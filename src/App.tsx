import { useState } from 'react' 
import './index.css'
import { TaskCard } from './components/taskCard'

const INITIAL_TASKS = [
  { id: 1, title: "Plantar lógica de arrays", category: "Dev", difficulty: "cobre", isDone: false },
  { id: 2, title: "Regar componentes React", category: "Estudo", difficulty: "prata", isDone: false },
  { id: 3, title: "Colher resultados do dia", category: "Vida", difficulty: "ouro", isDone: false },
];

function App() {
 
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function toggleTask(id: number) {
    console.log("Cliquei no ID:", id);
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(newTasks);
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

      <main className="max-w-2xl mx-auto flex flex-col gap-4">
        
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            title={task.title}
            category={task.category}
            dificulty={task.difficulty as any}
            isDone={task.isDone}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-font opacity-50 mt-10">Sua fazenda está limpa!</p>
        )}
      </main>
    </div>
  )
}

export default App