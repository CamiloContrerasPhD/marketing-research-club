import { Award, BookOpen, Sparkles, Target, type LucideIcon } from 'lucide-react';
import datos from './sessions.json';

/**
 * Los contenidos del programa viven en `sessions.json`, no aquí.
 *
 * Para cambiar sesiones, fechas, salones, horario o día de reunión, edita ese
 * archivo y haz push: el workflow de GitHub Actions recompila y publica solo.
 * No hace falta tocar este archivo ni ningún componente.
 */

export type SessionType = 'Virtual' | 'Presencial' | 'Híbrido';

export interface ProgramEvent {
  id: number;
  week: number;
  title: string;
  date: string;
  time: string;
  room: string;
  speaker: string;
  type: SessionType;
  description: string;
  image: string;
}

export interface Phase {
  name: string;
  subtitle: string;
  icon: LucideIcon;
  accent: 'blue' | 'blue-light' | 'orange' | 'yellow';
  events: ProgramEvent[];
}

/** Datos generales del semestre, editables en sessions.json. */
export const PROGRAMA = datos.programa;

/** Los iconos no caben en un JSON: el archivo guarda el nombre y aquí se resuelve. */
const ICONOS: Record<string, LucideIcon> = {
  BookOpen,
  Target,
  Sparkles,
  Award,
};

/** Normaliza la modalidad para tolerar "Hibrido" sin tilde en el JSON. */
function modalidad(valor: string): SessionType {
  const v = valor.trim().toLowerCase();
  if (v.startsWith('h')) return 'Híbrido';
  if (v.startsWith('v')) return 'Virtual';
  return 'Presencial';
}

/**
 * Formulario de inscripción al club (Microsoft Forms, cuenta del semillero).
 *
 * Reemplaza al Google Form anterior, que pertenecía a una cuenta de terceros:
 * las respuestas de los estudiantes llegaban a un buzón fuera de nuestro control.
 */
export const CLUB_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=fAS9-kj_KkmLu4-YufucytggQ1-camhDgyReX9xj2UVUMERQVFhSTlRQS0VUNU9PVVVMSVBKVDY0Si4u';

/**
 * Formulario de inscripción a una sesión suelta (Microsoft Forms).
 *
 * Pendiente: sustituye al endpoint de Formspree `mpqjrlll`, que pertenecía a
 * una cuenta ajena. Mientras esta constante esté vacía, el sitio dirige a los
 * interesados al formulario del club en vez de enviar datos a ese endpoint.
 */
export const SESSION_FORM_URL = '';

/**
 * Identificador de medición de Google Analytics 4 (formato G-XXXXXXXXXX).
 *
 * Es público por diseño: viaja en el HTML y no es un secreto. Déjalo vacío
 * para desactivar la analítica por completo; el banner tampoco aparecerá.
 */
export const GA_MEASUREMENT_ID = 'G-TQV1GV9NDB';

/** Manual de Política de Tratamiento de Datos Personales de la Universidad. */
export const POLITICA_DATOS_URL =
  'https://secretariageneral.uniandes.edu.co/images/documents/Manual-Politica-Tratamiento-Datos-Personales-2020-Uniandes.pdf';

/** Portal institucional de uso de datos personales. */
export const PORTAL_DATOS_URL = 'https://usodedatospersonales.uniandes.edu.co/es/';

/** Buzón del semillero. */
export const EMAIL_RECIPIENT = 'semillero_marketing_uniandes@uniandes.onmicrosoft.com';

export const AREA_URL =
  'https://administracion.uniandes.edu.co/profesores/areas-academicas/mercadeo/';

export const phases: Phase[] = datos.fases.map((fase, indiceFase) => ({
  name: fase.nombre,
  subtitle: fase.subtitulo,
  icon: ICONOS[fase.icono] ?? BookOpen,
  accent: fase.acento as Phase['accent'],
  events: fase.sesiones.map((s, indiceSesion) => ({
    id: indiceFase * 100 + indiceSesion + 1,
    week: s.semana,
    title: s.titulo,
    date: s.fecha,
    time: s.hora,
    room: s.salon ?? '',
    speaker: s.ponente,
    type: modalidad(s.modalidad),
    description: s.descripcion,
    image: s.imagen,
  })),
}));

export const allEvents: ProgramEvent[] = phases.flatMap((phase) => phase.events);
