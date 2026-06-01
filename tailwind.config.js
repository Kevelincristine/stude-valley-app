


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agora o Tailwind vai ler diretamente as variáveis do seu index.css!
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'background': 'var(--color-background)',
        'font': 'var(--color-font)',
        'segund': 'var(--color-segund)', // Adicionamos esta para os textos secundários das estações
        
        // Mantive as suas cores especiais caso use em outro lugar
        'special': '#105666',
        'shadow': '#0a3323',
      },
    },
  },
  plugins: [],
}