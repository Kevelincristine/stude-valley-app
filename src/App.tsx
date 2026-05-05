import './index.css'
import { TaskCard } from './components/taskCard'

function App() {
  return (
   <div className="min-h-screen p-8 bg-stude-beige">
      <header className="flex justify-between items-center border-b border-primary pb-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-font">Stude<span className="text-primary color-primary">Valley</span> </h1>
          <p className="text-secondary font-medium">Suas plantações de conhecimento</p>
        </div>
      </header>
      <main className="max-w-2xl mx-auto flex flex-col gap-4">
       
        <TaskCard title="Estudar Tailwind v4" category="React" dificulty="cobre" />
        <TaskCard title="Configurar Projeto Stude Valley" category="Setup" dificulty="prata" />
        <TaskCard title="Finalizar Lógica de XP" category="Lógica" dificulty="ouro" />
      </main>
    </div>
  )
}

export default App