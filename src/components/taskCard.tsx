//Barra de Tarefas
import { motion } from 'framer-motion'  // Biblioteca de animação
interface TaskCardInterface {
    title: string; // titulo
    dificulty: "cobre" | "prata" | "ouro"; //dificuldade
    category: string; // a categoria da tarefa
    isDone: boolean; //Se  foi finalizado ou não
    onToggle: () => void; // botão de feito
    onDelete: () => void; // botão de apagar
    
} // <- formato aceito para criação de uma tarefas

export function TaskCard({title, category, isDone, onToggle, onDelete}: TaskCardInterface)  {
  return (
    <motion.div
      // --- CONFIGURAÇÃO DA ANIMAÇÃO ---
      
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeOut"   }}  

      whileHover={{ y: -2 }} 
      whileTap={{ scale: 0.99 }} 

      // --- CONFIGURAÇÃO DA ANIMAÇÃO ---
      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-primary shadow-sm"
    >
      {/* BOTÃO cKECKBOX (SE FOI FEITO) */}
    <div className="flex items-center gap-3  rounded-50%"  >
        <input  type="checkbox" 
  checked={isDone}  
  onChange={onToggle}
  className="
    w-6 h-6 
    rounded-full 
    appearance-none 
    border-2 border-primary 
    checked:bg-secondary
    checked:border-secondary
    cursor-pointer 
    transition-all 
    duration-200
    relative
    after:content-['✓'] 
    after:text-white 
    after:hidden 
    checked:after:block 
    after:absolute 
    after:left-1/2 
    after:top-1/2 
    after:-translate-x-1/2 
    after:-translate-y-1/2
    after:text-xs"
     />
     {/* tarefa ou titulo*/}
    <span className={isDone ? "line-through opacity-50" : ""}>
    {title}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/*  categoria */}
        <span className="text-xs font-bold uppercase opacity-40 px-2 py-1 bg-background rounded-md">
          {category}
        </span>
        {/* BOTÃO PARA APAGAR TAREFA */}
        <button 
          onClick={onDelete}>
          ❌
        </button>
      </div>
    </motion.div>
  );
}
 // REVISADO?: SIM! 