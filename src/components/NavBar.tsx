// Area de navegação mobile e do PC
import {useState } from 'react' // importação do UseState

interface NavbarProps{
    currentView: string; // função que mostra que area está mostrando pelo id (ex:estatisticas ou plantar)
    setCurrentView: (view: string) => void; // função que altera a memoria do currentView
} // <-- Formato aceito para envio da tarefa

export function NavBar({currentView,setCurrentView}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const menuItems= [
       { id: 'plantar', label: '🌱 Nova Tarefa' },
        { id: 'estatisticas', label: '📊 Estatísticas' },
        { id: 'configuracoes', label: '⚙️ Configurações' }, // Informações do Nav 
    ]
    const handleNavigation = ( id:string) =>{
        setCurrentView(id)
        setIsOpen(false);
    } // Muda a view atual e fecha o menu
return (
  // Menu de navegação
    <nav className="bg-white border-b border-primary/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <div className="cursor-default" onClick={() => handleNavigation('plantar')}> 
            <h1 className="text-2xl font-bold text-font">
              Stude<span className="text-primary ml-0.2">Valley</span> 
            </h1>
          </div>

          {/* MENU PARA PC (Escondido no mobile, flex no lg:) */}
          <div className="hidden lg:flex items-center gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  currentView === item.id
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-font hover:bg-background'}`} 
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* BOTÃO HAMBÚRGUER (Aparece apenas no mobile/tablet) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-font p-2 rounded-xl hover:bg-background outline-none cursor-pointer"
            >
              {/* Ícone dinâmico: X se aberto, ☰ se fechado */}
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-background px-4 pt-2 pb-4 flex flex-col gap-2 shadow-inner">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                currentView === item.id
                  ? 'bg-secondary text-white'
                  : 'text-font hover:bg-background'
              }`}
            >
              {item.label}
            </button>
))}
        </div>
      )}
    </nav>
  );
}
// REVISADO?:SIM!