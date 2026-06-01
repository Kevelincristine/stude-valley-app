# 🌾 StudeValley 🌱

> Um gerenciador de tarefas gamificado inspirado na estética de *Stardew Valley*, projetado para transformar a rotina de estudos em uma jornada de colheita e evolução contínua.

O **StudeValley** é uma aplicação web interativa focada em produtividade. Através de mecânicas de jogos de RPG (*gamification*), o usuário cadastra suas tarefas diárias com diferentes níveis de dificuldade ("Plantações"), acumula pontos de experiência (XP) ao concluí-las ("Colheita") e assiste à evolução em tempo real da sua estufa digital em estilo *pixel art*.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como uma aplicação de demonstração (*demo*) de alto nível para portfólio, com o objetivo de consolidar e demonstrar competências sólidas em desenvolvimento frontend moderno, arquitetura de componentes escaláveis, design responsivo (Mobile-First) e, principalmente, **engenharia de software assistida por Inteligência Artificial**.

---

## 🚀 Principais Funcionalidades

- **Mecânica de Cultivo e XP Dinâmico:** Cada tarefa criada possui três graus de dificuldade que determinam a recompensa de XP (🥉 Cobre: 10 XP | 🥈 Prata: 50 XP | 🥇 Ouro: 100 XP). A curva de nível é exponencial ($100 \text{ XP} \times \text{Nível}$), exigindo cada vez mais consistência do usuário.
- **Estufa Reativa (Garden Component):** Renderização nítida de *Pixel Art* utilizando propriedades avançadas de CSS (`image-rendering: pixelated`). A estufa muda visualmente através de GIFs dinâmicos à medida que o usuário atinge marcos de nível específicos (Nível 1, <5, <10 e Mestre).
- **Interface Modular e Navegação Fluida:** Sistema de abas no painel direito gerenciado por estados complexos do React, permitindo navegar entre a área de gerenciamento, Relatório de Estatísticas e Configurações de forma instantânea.
- **Estatísticas Avançadas Reativas:** Painel de análise de performance em tempo real que calcula a Taxa de Eficiência da Fazenda, sementes ativas, itens colhidos e troféus conquistados por raridade.
- **Sistema de Estações Dinâmicas:** Mudança de clima customizável (Primavera, Verão, Outono e Inverno) através de variáveis nativas de CSS integradas ao Tailwind, alterando o ecossistema visual de fundo sem comprometer a identidade visual original.
- **Persistência Local Automatizada:** Utilização de *hooks* do React (`useEffect`) sincronizados para persistência de dados local estável via `localStorage`.

---

## 💻 Stack Tecnológica

O ecossistema do projeto foi escolhido para refletir as melhores práticas atuais do mercado de desenvolvimento web:

- **React 18:** Biblioteca base para a construção da interface reativa declarativa.
- **TypeScript:** Tipagem estática estrita para garantir a segurança do código, prevenção de bugs em tempo de compilação e criação de contratos limpos (`interfaces`).
- **Vite:** Ferramenta de build de última geração utilizada para *Hot Module Replacement* (HMR) ultrarrápido e bundling otimizado.
- **Tailwind CSS:** Framework utilitário de CSS focado em design responsivo ágil e customização baseada em tokens de design.
- **Framer Motion:** Biblioteca de animações físicas (*spring-based*) para transições suaves de entrada e saída de elementos (`AnimatePresence`).

---

## 🧠 Desenvolvimento Assistido por IA: O Copiloto de Engenharia

Um dos maiores diferenciais técnicos deste projeto é a forma como ele foi concebido e refinado. O desenvolvimento do **StudeValley** utilizou Inteligência Artificial avançada não como um mero gerador de código automático, mas como um **parceiro estratégico de Code Review, Pair Programming e Refatoração de Arquitetura**.

### Como a IA foi utilizada no processo de engenharia:
1. **Solução de Desafios Visuais (Pixel Art Rendering):** Discussão arquitetural para contornar o problema de embaçamento de imagens rasterizadas de baixa resolução ao serem expandidas no navegador, resultando na implementação limpa da propriedade `imageRendering: 'pixelated'` sem necessidade de plugins externos.
2. **Refatoração Responsiva e Mobile-First:** Diagnóstico estrutural guiado por IA para identificar problemas de travamento e vazamento de layout causados pelo uso incorreto da classe `sticky` em resoluções móveis. O layout foi modularizado para se adaptar perfeitamente de uma coluna empilhada (celular) para um Grid de proporções fixas `[320px_1fr]` (desktop).
3. **Gerenciamento de Estado Limpo:** Criação conjunta de fluxos de estados booleanos no `App.tsx` para controlar transições condicionais complexas, como o surgimento por cortina do `AddTaskForm` acionado pelo Menu Hambúrguer, e o seu fechamento automático ao disparar o evento de callback `onAddTask`.
4. **Temas Dinâmicos Orientados a Atributos:** Modelagem inteligente das estações do ano utilizando propriedades `:root` de CSS integradas ao arquivo `tailwind.config.js`. A IA auxiliou no mapeamento estrito para garantir que *apenas o background mudasse*, preservando os tokens fixos de acessibilidade de textos e botões primários.

Esse processo reduziu drasticamente o tempo de débito técnico e demonstrou a habilidade de atuar no modelo moderno de engenharia, combinando discernimento arquitetural humano com a agilidade analítica da IA.

---
