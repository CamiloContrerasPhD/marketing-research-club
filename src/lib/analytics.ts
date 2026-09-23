/**
 * Google Analytics 4, cargado solo si el visitante acepta.
 *
 * El script de gtag NO se inyecta al abrir la página. Se inyecta cuando
 * el visitante da su consentimiento explícito, y se recuerda la decisión
 * en localStorage. Así el sitio no deja cookies de analítica en quien
 * no las quiso, que es lo que exige la Ley 1581 para datos personales.
 *
 * La alternativa habitual es cargar gtag siempre y usar Consent Mode con
 * estado "denied". Es válida, pero deja el script corriendo desde el
 * primer instante; esta forma es más conservadora y más fácil de explicar.
 */

import { GA_MEASUREMENT_ID } from '@/data/program';

/** Clave donde se guarda la decisión del visitante. */
const CLAVE = 'mrc-consentimiento-analitica';

export type Consentimiento = 'aceptado' | 'rechazado' | null;

/** Lee la decisión guardada. Devuelve null si nunca decidió. */
export function leerConsentimiento(): Consentimiento {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'aceptado' || v === 'rechazado' ? v : null;
  } catch {
    // Navegación privada o almacenamiento bloqueado: se trata como "sin decidir".
    return null;
  }
}

/** Guarda la decisión para no volver a preguntar en cada visita. */
export function guardarConsentimiento(valor: Exclude<Consentimiento, null>) {
  try {
    localStorage.setItem(CLAVE, valor);
  } catch {
    /* sin almacenamiento no hay nada que guardar; el banner reaparecerá */
  }
}

let yaCargado = false;

/**
 * Inyecta gtag.js y envía la primera vista de página.
 *
 * Es idempotente: llamarla dos veces no duplica el script ni los eventos.
 */
export function activarAnalitica() {
  if (yaCargado) return;
  if (!GA_MEASUREMENT_ID) return; // sin ID configurado no hay nada que cargar
  yaCargado = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // gtag opera sobre este arreglo global; se llena antes de que el script cargue
  // y la librería procesa la cola cuando termina de descargarse.
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    // El sitio es una sola página con anclas: la vista se envía una vez.
    send_page_view: true,
    // Sin esto GA4 guarda la IP completa. Reducirla es buena práctica.
    anonymize_ip: true,
  });
}

/** Si ya había aceptado en una visita anterior, arranca sin preguntar. */
export function activarSiYaAcepto() {
  if (leerConsentimiento() === 'aceptado') activarAnalitica();
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
