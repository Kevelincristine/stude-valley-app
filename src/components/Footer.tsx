// Rodapé reutilizável, usado tanto na WelcomeScreen quanto na página principal do app
export function Footer() {
  return (
    <footer className="w-full py-4 sm:py-6 text-center">
      <p className="text-segund text-[11px] sm:text-xs">
        Conheça mais a criadora:{' '}
        <a
          href="https://github.com/Kevelincristine"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary hover:underline"
        >
          Kevelincristine (Kevelin Cristine Santos)
        </a>
      </p>
    </footer>
  );
}
// REVISADO?:SIM!