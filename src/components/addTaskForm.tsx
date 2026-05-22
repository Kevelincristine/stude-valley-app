import { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (title: string, category: string, dificulty: "cobre" | "prata" | "ouro") => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<"cobre" | "prata" | "ouro">('cobre');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask(title, category || 'Geral', difficulty);
    
    setTitle('');
    setCategory('');
  }

  return (
    // 1. LIMPEZA: Removemos a borda e o fundo redundantes, controlamos o espaçamento interno
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-bold text-font">Nova Plantação!!</h2>
      
      {/* Input de Título */}
      <div className="flex flex-col gap-2">
        <input 
          type="text" 
          placeholder="O que você precisa fazer?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font text-sm md:text-base transition-colors"
        />
      </div>

      {/* 2. FLEX RESPONSIVO: No celular fica em coluna, a partir de telas pequenas (sm:) fica lado a lado */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <input 
          type="text" 
          placeholder="Categoria (ex: Estudo, Lazer)" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:flex-1 p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font text-sm md:text-base transition-colors"
        />

        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as "cobre" | "prata" | "ouro")}
          
          className="w-full sm:w-auto p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font text-sm md:text-base bg-white cursor-pointer transition-colors"
        >
          <option value="cobre">🥉 Cobre (Fácil)</option>
          <option value="prata">🥈 Prata (Médio)</option>
          <option value="ouro">🥇 Ouro (Difícil)</option>
        </select>
      </div>

      {/* Botão de Enviar */}
      <button 
        type="submit"
        // Adicionado active:scale-95 para dar aquele feedback de clique rápido e crocante
        className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-sm md:text-base mt-2 shadow-sm"
      >
        Plantar Tarefa!
      </button>
    </form>
  );
}