interface ConfigViewProps {
  onResetFarm: () => void;
  currentTheme: string;
  onChangeTheme: (theme: string) => void;
}

export function ConfigView({ onResetFarm, currentTheme, onChangeTheme }: ConfigViewProps) {
  
  function handleResetClick() {
    const confirmou = window.confirm(
      "⚠️ Tem certeza que quer resetar a sua fazenda? Isto vai apagar todas as suas tarefas e o teu progresso atual!"
    );
    if (confirmou) onResetFarm();
  }

  // Lista com as estações disponíveis
  const seasons = [
    { id: 'primavera', name: '🌱 Primavera', activeClass: 'border-green-600 bg-green-50 text-green-700' },
    { id: 'verao', name: '☀️ Verão', activeClass: 'border-amber-500 bg-amber-50 text-amber-700' },
    { id: 'outono', name: '🍂 Outono', activeClass: 'border-orange-700 bg-orange-50 text-orange-800' },
    { id: 'inverno', name: '❄️ Inverno', activeClass: 'border-blue-500 bg-blue-50 text-blue-700' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* SEÇÃO 1: APARÊNCIA */}
      <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
        <h2 className="text-xl font-bold text-font mb-2 flex items-center gap-2">
          🎨 Customizar Vale (Estações)
        </h2>
        <p className="text-segund text-xs mb-4">
          Escolha a estação do ano ideal para o seu ambiente de estudos.
        </p>
        
        {/* Grid de botões das estações */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {seasons.map((season) => {
            const isSelected = currentTheme === season.id;
            return (
              <button
                key={season.id}
                onClick={() => onChangeTheme(season.id)}
                className={`p-3 border-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected 
                    ? season.activeClass
                    : 'border-gray-200 bg-background text-font hover:border-primary/50'
                }`}
              >
                {season.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SEÇÃO 2: DADOS E SEGURANÇA */}
      <div className="bg-white p-6 rounded-2xl border-2 border-red-500/10 shadow-sm">
        <h2 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
           Zona de Perigo
        </h2>
        <p className="text-segund text-xs mb-4">
          Ações irreversíveis para a gestão dos dados da sua conta local.
        </p>
        
        <div className="p-4 bg-red-50 rounded-xl border border-red-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-bold text-font">Resetar Progresso Atual</p>
            <p className="text-xs text-segund">Apaga todas as sementes, colheitas e reseta o seu nível para o 1.</p>
          </div>
          
          <button 
            onClick={handleResetClick}
            className="w-full sm:w-auto bg-red-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-700 active:scale-95 transition-all cursor-pointer text-sm shadow-sm"
          >
            Resetar Fazenda 
          </button>
        </div>
      </div>

    </div>
  );
}