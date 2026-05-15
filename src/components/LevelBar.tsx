interface LevelBarProps{
    tasks: Array<{difficulty: string; isDone: boolean }>};
export function LevelBar({ tasks }: LevelBarProps){
    const TotalXP = tasks.reduce((acc,task) => {
        if(!task.isDone) return acc;
    const points ={ cobre:10,prata:50, ouro: 100};
    return acc +(points[task.difficulty as keyof typeof points] || 0);
},0);

    let level = 1;
    let xpNecessarioParaProximo = 100
    let tempXP = TotalXP;

  while (tempXP >= xpNecessarioParaProximo) {
    tempXP -= xpNecessarioParaProximo;
    level++;
    xpNecessarioParaProximo += 100;
  }
  const progressoPercentual = (tempXP / xpNecessarioParaProximo) * 100;

  return (
    <section className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-2xl border-2 border-primary shadow-sm">
      <div className="flex justify-between items-end mb-3">
       
        <div className="flex items-baseline gap-2">
           <span className="text-4x font-bold text-primary uppercase tracking-widest">
             Fazendeiro(a) Nível:
           </span>
           <span className="font-bold text-font text-4x leading-none">
             {level}
           </span>
        </div>

        <span className="text-sm font-semibold text-segund bg-background px-3 py-1 rounded-full">
            {tempXP} / {xpNecessarioParaProximo} XP
        </span>
      </div>
      <div className="w-full h-5 bg-background rounded-full overflow-hidden border-2 border-primary/10 p-0.5">
        <div 
          className="h-full  bg-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressoPercentual}%` }}
        />
      </div>

      <p className="text-[10px] text-font/50 mt-3 uppercase font-bold text-center tracking-[0.2em]">
        Total Colhido: {TotalXP} XP
      </p>
    </section>
  );
}
// Melhorias: Nenhuma

