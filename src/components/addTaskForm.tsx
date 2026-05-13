import{useState}  from 'react';

interface AddTaskFormProps{
onAddTask: (title: string,category: string, dificulty: "cobre" | "prata" | "ouro",) => void;
}
export function AddTaskForm({onAddTask}: AddTaskFormProps) {

    const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<"cobre" | "prata" | "ouro">('cobre');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title, category || 'Geral', difficulty);
    
    setTitle('');
    setCategory('');
  }
   return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-primary p-6 rounded-2xl shadow-sm mb-8 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-font">Nova Plantação!!</h2>
      
      <div className="flex flex-col gap-2">
        <input 
          type="text" 
          placeholder="O que você precisa fazer?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font"
        />
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="Categoria (ex: Estudo, Lazer, Trabalho)" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font"
        />

        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
          className="p-3 border-2 border-background rounded-xl focus:border-primary outline-none text-font bg-white"
        >
          <option value="cobre">🥉 Cobre (Fácil)</option>
          <option value="prata">🥈 Prata (Médio)</option>
          <option value="ouro">🥇 Ouro (Difícil)</option>
        </select>
      </div>

      <button 
        type="submit"
        className="bg-secondary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all cursor-pointer"
      >
        Plantar Tarefa
      </button>
    </form>
  );
}