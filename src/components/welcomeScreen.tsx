// Tela inicial (Onboarding): coleta nome do usuário, escolha e nome da planta
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

// Formato salvo no localStorage e usado pelo resto do app
export interface PlayerProfile {
  userName: string;
  plantType: 'girassol' | 'gerbera' | 'lavanda';
  plantName: string;
}

interface WelcomeScreenProps {
  onComplete: (profile: PlayerProfile) => void;
}

// As 3 opções de planta disponíveis pro jogador escolher
const PLANT_OPTIONS: Array<{
  id: PlayerProfile['plantType'];
  label: string;
  seedImage: string;
  desc: string;
}> = [
  { id: 'girassol', label: 'Girassol', seedImage: '/icons/SementeG.png', desc: 'Alegre e cheio de energia' },
  { id: 'gerbera', label: 'Gérbera', seedImage: '/icons/SementeGe.png', desc: 'Resistente, cresce no seu ritmo' },
  { id: 'lavanda', label: 'Lavanda', seedImage: '/icons/SementeL.png', desc: 'Cresce rápido a cada tarefa' },
];

const PROJECT_DESCRIPTION =
  'Transforme suas tarefas em uma plantinha que cresce com você. Cada tarefa concluída rende XP e faz sua planta evoluir — bem-vindo(a) à sua fazenda digital!';

// Detecta se o usuário prefere menos animação (acessibilidade)
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = () => setReduced(query.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Hook que revela o texto aos poucos, como se estivesse sendo digitado
function useTypewriter(text: string, speed: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }
    indexRef.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  const isTyping = enabled && displayed.length < text.length;
  return { displayed, isTyping };
}

// Anima o título letra por letra, mantendo a cor original de cada trecho
function AnimatedTitle({ reduceMotion }: { reduceMotion: boolean }) {
  const stude = 'Stude';
  const valley = 'Valley';

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.045 },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: -16, scale: 0.6 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 320, damping: 16 },
    },
  };

  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={container}
      className="sv-title-glow text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold inline-flex"
    >
      <span className="text-font inline-flex">
        {stude.split('').map((char, i) => (
          <motion.span key={`s-${i}`} variants={letter}>{char}</motion.span>
        ))}
      </span>
      <span className="text-primary inline-flex">
        {valley.split('').map((char, i) => (
          <motion.span key={`v-${i}`} variants={letter}>{char}</motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const reduceMotion = usePrefersReducedMotion();

  // Controla em qual passo do onboarding o usuário está (1: nomes, 2: escolha da planta)
  const [step, setStep] = useState<1 | 2>(1);

  const [userName, setUserName] = useState('');
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState<PlayerProfile['plantType'] | null>(null);

  const { displayed: typedDescription, isTyping } = useTypewriter(
    PROJECT_DESCRIPTION,
    22,
    !reduceMotion
  );

  // Passo 1 só libera avanço se os dois campos estiverem preenchidos
  const canAdvance = userName.trim().length > 0 && plantName.trim().length > 0;

  function handleStart() {
    if (!plantType) return;
    onComplete({
      userName: userName.trim(),
      plantName: plantName.trim(),
      plantType,
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 sm:p-6 lg:p-10">
      <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md sm:max-w-lg lg:max-w-4xl xl:max-w-5xl bg-white rounded-2xl border-2 border-primary/10 shadow-sm p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center"
      >
        {/* COLUNA DO FORMULÁRIO: cabeçalho, indicador de passo e os passos do onboarding */}
        <div className="flex flex-col gap-6 lg:gap-8 flex-1 min-w-0">
        {/* CABEÇALHO / RESUMO DO STUDEVALLEY */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            <AnimatedTitle reduceMotion={reduceMotion} />
            <motion.img
              src="/Icon_site.png"
              alt="Ícone do StudeValley"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: reduceMotion ? 0 : 0.4 }}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <p className="text-segund text-xs sm:text-sm lg:text-lg xl:text-xl mt-3 lg:mt-5 leading-relaxed lg:leading-relaxed max-w-2xl mx-auto min-h-[3.5em] lg:min-h-[3em]">
            {typedDescription}
            {isTyping && (
              <span className="inline-block  h-[1em] bg-primary ml-0.5 align-middle animate-pulse" />
            )}
          </p>
        </div>

        {/* INDICADOR DE PASSO */}
        <div className="flex items-center justify-center gap-2">
          <div className={`h-1.5 lg:h-2 w-8 lg:w-12 rounded-full transition-all ${step === 1 ? 'bg-secondary' : 'bg-primary/20'}`} />
          <div className={`h-1.5 lg:h-2 w-8 lg:w-12 rounded-full transition-all ${step === 2 ? 'bg-secondary' : 'bg-primary/20'}`} />
        </div>

        {/* PASSO 1: NOME DO USUÁRIO E NOME DA PLANTA */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4 lg:gap-6"
          >
            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="text-xs lg:text-base font-bold text-font uppercase tracking-wide">
                Como podemos te chamar?
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 lg:p-4 border-2 border-background rounded-xl focus:border-primary outline-none text-font text-sm md:text-base lg:text-lg transition-colors"
                maxLength={30}
              />
            </div>

            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="text-xs lg:text-base font-bold text-font uppercase tracking-wide">
                Dê um nome para sua planta
              </label>
              <input
                type="text"
                placeholder="Nome da sua planta"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                className="w-full p-3 lg:p-4 border-2 border-background rounded-xl focus:border-primary outline-none text-font text-sm md:text-base lg:text-lg transition-colors"
                maxLength={20}
              />
            </div>

            <button
              type="button"
              disabled={!canAdvance}
              onClick={() => setStep(2)}
              className="w-full bg-secondary text-white font-bold py-3 lg:py-4 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-sm md:text-base lg:text-lg mt-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Continuar
            </button>
          </motion.div>
        )}

        {/* PASSO 2: ESCOLHA DA PLANTA */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4 lg:gap-6"
          >
            <p className="text-xs lg:text-base font-bold text-font uppercase tracking-wide text-center">
              Escolha o tipo da sua planta
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
              {PLANT_OPTIONS.map((option) => {
                const isSelected = plantType === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPlantType(option.id)}
                    className={`flex flex-col items-center gap-1 lg:gap-2 p-4 lg:p-6 rounded-xl border-2 transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'border-secondary bg-secondary/10'
                        : 'border-background hover:border-primary/40'
                    }`}
                  >
                    <img
                      src={option.seedImage}
                      alt={`Semente de ${option.label}`}
                      className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <span className="font-bold text-font text-sm lg:text-lg">{option.label}</span>
                    <span className="text-segund text-[11px] lg:text-sm leading-tight">{option.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 lg:gap-4 mt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-background text-font font-bold py-3 lg:py-4 px-4 rounded-xl hover:opacity-80 active:scale-[0.98] transition-all cursor-pointer text-sm md:text-base lg:text-lg"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!plantType}
                onClick={handleStart}
                className=" bg-secondary text-white font-bold py-3 lg:py-4 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-sm md:text-base lg:text-lg shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                Começar a plantar! 🌱
              </button>
            </div>
          </motion.div>
        )}
        </div>
        {/* FIM DA COLUNA DO FORMULÁRIO */}

        {/* COLUNA DECORATIVA: QR Code + título chamativo, e o GIF da plantinha embaixo.
            No celular/tablet fica tudo empilhado abaixo do formulário; em telas grandes (lg+) fica ao lado. */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 mx-auto lg:mx-0 self-center">

          {/* QR CODE + TÍTULO CHAMATIVO: escondido no celular, aparece a partir de tablets (sm+) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden sm:flex flex-col items-center gap-2"
          >
            <motion.p
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-pink-500 font-extrabold text-lg sm:text-xl lg:text-2xl xl:text-3xl uppercase tracking-wide drop-shadow-sm"
            >
              Teste Já
            </motion.p>
            <img
              src="/QrCode.png"
              alt="QR Code para testar o StudeValley"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain rounded-lg border-2 border-primary/10 bg-white p-1"
            />
          </motion.div>

          {/* GIF DECORATIVO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
          >
            <img
              src="/Flor_nascendo.gif"
              alt="Planta crescendo"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </motion.div>
      </div>

      <Footer />
    </div>
  );
}
// REVISADO?:SIM!