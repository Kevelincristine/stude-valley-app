// Função estatisticas
interface Task {
  id: number;
  title: string;
  category: string;
  difficulty: "cobre" | "prata" | "ouro";
  isDone: boolean;
} // interface das tarefas

interface StatsViewProps {
  tasks: Task[];
} // lista de tarefas

export function StatsView({ tasks }: StatsViewProps) {
  // 1. Cálculos baseados na sua lista de tarefas
  const totalCreated = tasks.length;
  const totalDone = tasks.filter(t => t.isDone).length;
  
  // Porcentagem de conclusão para a barra de progresso geral
  const completionRate = totalCreated > 0 ? Math.round((totalDone / totalCreated) * 100) : 0;

  // Contagem por dificuldade
  const copperDone = tasks.filter(t => t.isDone && t.difficulty === 'cobre').length;
  const silverDone = tasks.filter(t => t.isDone && t.difficulty === 'prata').length;
  const goldDone = tasks.filter(t => t.isDone && t.difficulty === 'ouro').length;

  // Contagem de tarefas por categoria, do maior pro menor (top 5)
  const categoryCounts = tasks.reduce<Record<string, number>>((acc, t) => {
    const cat = t.category || 'Geral';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCategoryCount = topCategories.length > 0 ? topCategories[0][1] : 0;

  // Mensagem contextual conforme o progresso atual
  const motivationalMessage =
    totalCreated === 0
      ? 'Plante sua primeira tarefa pra começar a colher resultados!'
      : completionRate >= 80
      ? 'Sua fazenda está florescendo! Continue assim. 🌟'
      : completionRate >= 40
      ? 'Bom progresso! Falta pouco pra colher tudo.'
      : 'Hora de regar suas tarefas pendentes!';

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* CARD PRINCIPAL: Progresso da Fazenda */}
      <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
        <h2 className="text-xl font-bold text-font mb-4 flex items-center gap-2">
           Relatório de Desempenho
        </h2>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-bold text-font">
            <span>Total de tarefas feitas atualmente</span>
            <span>{completionRate}%</span>
          </div>
          {/* Barra de progresso visual */}
          <div className="w-full h-4 bg-background rounded-full overflow-hidden border border-primary/10">
            <div 
              className="h-full bg-secondary transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-xs text-segund italic mt-1">{motivationalMessage}</p>
        </div>
      </div>

      {/* GRID DE QUADRADOS: Contadores de Colheita */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Total Plantado */}
        <div className="bg-white p-4 rounded-2xl border-2 border-primary/10 shadow-sm flex flex-col items-center text-center justify-center">
          <span className="text-2xl mb-1">✔️</span>
          <span className="text-2xl font-bold text-font">{totalCreated}</span>
          <span className="text-[11px] font-bold text-segund uppercase tracking-wider">Total de tarefas</span>
        </div>

        {/* Total Colhido */}
        <div className="bg-white p-4 rounded-2xl border-2 border-primary/10 shadow-sm flex flex-col items-center text-center justify-center">
          <span className="text-2xl mb-1">🌾</span>
          <span className="text-2xl font-bold text-font">{totalDone}</span>
          <span className="text-[11px] font-bold text-segund uppercase tracking-wider">Total Feitas</span>
        </div>

        {/* Pendentes */}
        <div className="bg-white p-4 rounded-2xl border-2 border-primary/10 shadow-sm flex flex-col items-center text-center justify-center">
          <span className="text-2xl mb-1">⏳</span>
          <span className="text-2xl font-bold text-font">{totalCreated - totalDone}</span>
          <span className="text-[11px] font-bold text-segund uppercase tracking-wider">Pendentes</span>
        </div>

        {/* Nível do Solo */}
        <div className="bg-white p-4 rounded-2xl border-2 border-primary/10 shadow-sm flex flex-col items-center text-center justify-center">
          <span className="text-2xl mb-1">⭐️</span>
          <span className="text-2xl font-bold text-font">
            {completionRate >= 80 ? 'Fértil' : completionRate >= 40 ? 'Regular' : 'Seco'}
          </span>
          <span className="text-[11px] font-bold text-segund uppercase tracking-wider">Nível de desempenho</span>
        </div>

      </div>

      {/* SEÇÃO DE CATEGORIAS: onde o usuário mais planta esforço */}
      {topCategories.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
          <h3 className="text-md font-bold text-font mb-4 uppercase tracking-wider text-xs">
            🌱 Onde Você Mais Planta
          </h3>

          <div className="flex flex-col gap-3">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-bold text-font">
                  <span>{category}</span>
                  <span className="text-segund">{count} {count === 1 ? 'tarefa' : 'tarefas'}</span>
                </div>
                <div className="w-full h-2.5 bg-background rounded-full overflow-hidden border border-primary/10">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${maxCategoryCount > 0 ? (count / maxCategoryCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO DE TROFÉUS POR DIFICULDADE */}
      <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
        <h3 className="text-md font-bold text-font mb-4 uppercase tracking-wider text-xs">
          🏆 Minerais Desbloqueados (Tarefas Concluídas)
        </h3>
        
        <div className="flex flex-col gap-3">
          {/* Cobre */}
          <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥉</span>
              <div>
                <p className="text-sm font-bold text-font">Minério de Cobre</p>
                <p className="text-xs text-segund">Tarefas fáceis concluídas</p>
              </div>
            </div>
            <span className="font-bold text-font bg-white px-3 py-1 rounded-full border text-sm">{copperDone}</span>
          </div>

          {/* Prata */}
          <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥈</span>
              <div>
                <p className="text-sm font-bold text-font">Minério de Prata</p>
                <p className="text-xs text-segund">Tarefas médias concluídas</p>
              </div>
            </div>
            <span className="font-bold text-font bg-white px-3 py-1 rounded-full border text-sm">{silverDone}</span>
          </div>

          {/* Ouro */}
          <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥇</span>
              <div>
                <p className="text-sm font-bold text-font">Minério de Ouro</p>
                <p className="text-xs text-segund">Tarefas difíceis concluídas</p>
              </div>
            </div>
            <span className="font-bold text-font bg-white px-3 py-1 rounded-full border text-sm">{goldDone}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
// Revisado?: SIM!