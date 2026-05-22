import { motion, AnimatePresence } from 'framer-motion';

interface GardenProps {
  level: number;
}

export function Garden({ level }: GardenProps) {

  const getStageContent = () => {
    // IMPORTANTE: Seu nível inicial no App.tsx começa em 1, então tratamos o nível 1 como o começo!
    if (level === 1) return { 
      img: "/Vaso_Acabado.gif", 
      label: "Apenas um vaso triste",
      desc: "Complete  algumas tarefas para animar o vaso"
    };
    if (level < 5) return { 
      img: "/Planta_crescendo.gif", 
      label: "Em Restauração",
      desc: "Algo está crescendo!"
    };
    if (level < 10) return { 
      img: "/Flor_nascendo.gif", 
      label: "Quase lá",
      desc: "Já pode se chamar de agricultor!."
    };
    return { 
      img: "/Flor_pronta.gif", // Não esqueça de colocar a barra '/' quando tiver esse GIF
      label: "Parabéns!",
      desc: "O ápice da sua dedicação! ✨"
    };
  };

  const stage = getStageContent();

  return (
    <section className="max-w-md mx-auto mt-8 flex flex-col items-center">
      {/* Caixa 4x4 (256px por 256px) */}
      <div className="relative w-64 h-64 bg-[#3a2e26] rounded-2xl border-4 border-[#6d4c41] shadow-2xl overflow-hidden flex items-center justify-center group">
        
        <AnimatePresence mode="wait">
          <motion.img
            key={level} 
            src={stage.img}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            
            // MUDANÇA AQUI: troquei object-cover por object-contain para o GIF não cortar nas bordas
            className="w-full h-full object-contain" 
            alt="Estágio da Estufa"
            
            // O SEGREDO DO PIXEL ART: Impede o navegador de borrar a imagem ao esticar!
            style={{ imageRendering: 'pixelated' }} 
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