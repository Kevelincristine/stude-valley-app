
interface TaskCardInterface {
    title: string;
    dificulty: "cobre" | "prata" | "ouro";
    category: string;
    isDone: boolean;
    onToggle: () => void;
    onDelete: () => void;
    
}



export function TaskCard({title, dificulty, category, isDone, onToggle, onDelete}: TaskCardInterface) {
  return (
    <div className={`
      border-2 p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all
      /* Aqui forçamos um fundo cinza claro padrão se estiver pronto */
      ${isDone ? 'bg-gray-100 border-gray-300' : 'bg-white border-primary'}
    `}>
      <div className="flex items-center gap-4">
        {/* Checkbox - Usei 'bg-green-600' para testar se a cor aparece */}
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Evita que o clique "vaze" para outros elementos
            onToggle();
          }} 
          className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all
            ${isDone ? 'bg-green-600 border-green-600' : 'border-gray-400 hover:bg-gray-100'}
          `}
        >
          {/* Se estiver pronto, coloca um check branco dentro */}
          {isDone && <span className="text-white text-xs flex items-center justify-center">✓</span>}
        </div>
        
        <div>
          {/* O segredo do 'line-through' */}
          <h3 className={`font-bold text-font text-lg transition-all ${isDone ? 'line-through opacity-40' : ''}`}>
            {title}
          </h3>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background text-primary uppercase">
            {category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-2xl">
          {dificulty === "cobre" ? "🥉" : dificulty === "prata" ? "🥈" : "🥇"}
        </span>
        <button 
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 transition-all cursor-pointer text-xl p-2"
        >
          ❌
        </button>
      </div>
    </div>
  );
}