import { useEffect, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/Isotipo';
import { CLUB_FORM_URL } from '@/data/program';

const NAV_LINKS = [
  { href: '#agenda', label: 'Agenda' },
  { href: '#fases', label: 'Fases' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#area', label: 'Área de Mercadeo' },
];

/**
 * Header fijo.
 *
 * El header anterior se volvía ilegible al bajar porque alternaba entre
 * `bg-transparent` y una capa translúcida oscura: sobre las secciones claras
 * el logo y los enlaces blancos desaparecían. Aquí el estado "scrolled" pinta
 * un fondo blanco sólido y cambia el logo a su variante de color, de modo que
 * el contenido del header siempre conserva contraste. Además el menú ya existe
 * en móvil, donde antes simplemente no se renderizaba.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Cierra el menú al pasar a escritorio.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,padding] duration-300 ${
        solid
          ? 'bg-white/95 py-2.5 shadow-[0_1px_0_0_rgba(37,66,145,0.10),0_10px_30px_-18px_rgba(25,46,100,0.45)] backdrop-blur-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        <a
          href="#top"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mrc-yellow focus-visible:ring-offset-2"
          aria-label="Marketing Research Club — inicio"
        >
          <Logo
            variant={solid ? 'secundaria' : 'blanco'}
            tone={solid ? 'ink' : 'blanco'}
            markClassName={solid ? 'h-9' : 'h-10'}
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-[0.82rem] font-semibold uppercase tracking-wider transition-colors ${
                solid
                  ? 'text-mrc-ink hover:bg-mrc-paper-alt hover:text-mrc-blue'
                  : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CLUB_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-reveal ml-2 inline-flex items-center gap-2 rounded-lg bg-mrc-yellow px-4 py-2.5 text-[0.82rem] font-bold uppercase tracking-wider text-mrc-blue-deep transition-colors hover:bg-mrc-yellow-deep"
          >
            Únete
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            solid ? 'text-mrc-blue hover:bg-mrc-paper-alt' : 'text-white hover:bg-white/10'
          }`}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panel móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-mrc-blue/10 bg-white transition-[max-height] duration-300 md:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-3" aria-label="Principal móvil">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-3 text-sm font-semibold uppercase tracking-wider text-mrc-ink hover:bg-mrc-paper-alt hover:text-mrc-blue"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CLUB_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-mrc-yellow px-4 py-3 text-sm font-bold uppercase tracking-wider text-mrc-blue-deep"
          >
            Únete al Club
            <ExternalLink className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
