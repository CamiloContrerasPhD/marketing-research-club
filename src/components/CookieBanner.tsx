import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import {
  activarAnalitica,
  activarSiYaAcepto,
  guardarConsentimiento,
  leerConsentimiento,
} from '@/lib/analytics';
import { EMAIL_RECIPIENT } from '@/data/program';

/**
 * Banner de consentimiento de cookies.
 *
 * Aparece solo si el visitante no ha decidido. Si aceptó en una visita
 * anterior, la analítica arranca sin preguntar de nuevo. La decisión se
 * puede cambiar después desde el enlace del pie de página, que dispara
 * el evento 'mrc:abrir-cookies'.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    activarSiYaAcepto();
    if (leerConsentimiento() === null) setVisible(true);

    // Permite reabrir la decisión desde cualquier parte del sitio.
    const reabrir = () => setVisible(true);
    window.addEventListener('mrc:abrir-cookies', reabrir);
    return () => window.removeEventListener('mrc:abrir-cookies', reabrir);
  }, []);

  if (!visible) return null;

  const aceptar = () => {
    guardarConsentimiento('aceptado');
    activarAnalitica();
    setVisible(false);
  };

  const rechazar = () => {
    guardarConsentimiento('rechazado');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-mrc-blue/15 bg-white/98 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
        <Cookie className="hidden h-8 w-8 shrink-0 text-mrc-blue sm:block" />

        <div className="flex-1">
          <p className="text-sm font-bold text-mrc-blue-deep">
            Usamos cookies de analítica
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-mrc-gray">
            Nos sirven para saber cuánta gente visita el sitio y qué secciones
            consulta. No las activamos sin tu permiso y no las usamos para
            publicidad. Puedes cambiar de opinión cuando quieras, o escribirnos a{' '}
            <a
              href={`mailto:${EMAIL_RECIPIENT}`}
              className="font-semibold text-mrc-blue underline"
            >
              el correo del semillero
            </a>
            .
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={rechazar}
            className="flex-1 rounded-lg border-2 border-mrc-blue/25 px-5 py-2.5 text-sm font-bold text-mrc-blue-deep transition-colors hover:border-mrc-blue lg:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={aceptar}
            className="flex-1 rounded-lg bg-mrc-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-mrc-blue-deep lg:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
