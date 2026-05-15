import { motion, AnimatePresence } from 'framer-motion';

interface GardenProps {
  level: number;
}

export function Garden({ level }: GardenProps) {

  const getStageContent = () => {
    if (level === 0) return { 
      img: "URL_DA_ESTUFA_DESTRUIDA.gif", 
      label: "Estufa Abandonada",
      desc: "Complete tarefas para restaurar este lugar."
    };
    if (level < 5) return { 
      img: "URL_DA_ESTUFA_EM_OBRAS.gif", 
      label: "Em Restauração",
      desc: "O telhado está voltando!"
    };
    if (level < 10) return { 
      img: "URL_DA_ESTUFA_QUASE_PRONTA.gif", 
      label: "Estufa Funcional",
      desc: "Já podemos plantar algo aqui."
    };
    return { 
      img: "URL_DA_ESTUFA_LINDA.gif", 
      label: "Mestre da Estufa",
      desc: "O ápice da sua dedicação! ✨"
    };
  };
  const stage = getStageContent();
  return (
    <section className="max-w-md mx-auto mt-8 flex flex-col items-center">
      <div className="relative w-64 h-64 bg-[#3a2e26] rounded-2xl border-4 border-[#6d4c41] shadow-2xl overflow-hidden flex items-center justify-center group">
        <AnimatePresence mode="wait">
          <motion.img
            key={level} 
            src={stage.img}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full h-full object-cover"
            alt="Estágio da Estufa"
          />
        </AnimatePresence>
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-bold">
          LVL {level}
        </div>
      </div>
      <div className="text-center mt-4">
        <h4 className="text-font font-bold uppercase tracking-widest text-sm">{stage.label}</h4>
        <p className="text-segund text-xs italic">{stage.desc}</p>
      </div>
    </section>
  );
}
// Melhorias: Fazer os gifs e inpecionar a logica .