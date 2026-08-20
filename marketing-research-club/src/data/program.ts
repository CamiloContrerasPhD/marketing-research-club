import { Award, BookOpen, Sparkles, Target, type LucideIcon } from 'lucide-react';

export type SessionType = 'Virtual' | 'Presencial' | 'Híbrido';

export interface ProgramEvent {
  id: number;
  week: number;
  title: string;
  date: string;
  time: string;
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

/** Enlace al formulario de inscripción al club. */
export const CLUB_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScsp2WEuDHynYGwdHi4RkZsQkE_-zlC4svjLI6_gKUwnzL45Q/viewform';

/** Endpoint de Formspree para las inscripciones a sesiones. */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqjrlll';

/** Buzón del semillero. */
export const EMAIL_RECIPIENT = 'semillero_marketing_uniandes@uniandes.onmicrosoft.com';

export const AREA_URL =
  'https://administracion.uniandes.edu.co/profesores/areas-academicas/mercadeo/';

export const phases: Phase[] = [
  {
    name: 'Fase 1',
    subtitle: 'Fundamentos y Sentidos',
    icon: BookOpen,
    accent: 'blue',
    events: [
      {
        id: 1,
        week: 1,
        title: 'Lanzamiento y Speed Research Dating',
        date: 'Lunes 26 de enero',
        time: '15:30 - 17:00',
        speaker: 'Equipo del Club',
        type: 'Presencial',
        description:
          'Bienvenida al semillero, presentación de objetivos y actividad de networking para conocer a los miembros y formar equipos de investigación.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      },
      {
        id: 2,
        week: 2,
        title: 'Método Científico en Marketing',
        date: 'Lunes 02 de febrero',
        time: '15:30 - 17:00',
        speaker: 'Profesores del Área',
        type: 'Virtual',
        description:
          'Fundamentos del método científico aplicado a la investigación de mercados. Formulación de preguntas, hipótesis y diseño de estudios.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      },
      {
        id: 3,
        week: 3,
        title: 'Experimento de Sentidos',
        date: 'Lunes 09 de febrero',
        time: '15:30 - 17:00',
        speaker: 'Felipe Reinoso-Carvajal',
        type: 'Híbrido',
        description:
          'Exploración de la mercadotecnia sensorial y cómo los sentidos influyen en el comportamiento del consumidor. Experiencia práctica incluida.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      },
      {
        id: 4,
        week: 4,
        title: 'Club de Lectura y Gaps',
        date: 'Lunes 16 de febrero',
        time: '15:30 - 17:00',
        speaker: 'Equipo del Club',
        type: 'Virtual',
        description:
          'Análisis de artículos científicos relevantes e identificación de gaps de investigación para desarrollar proyectos originales.',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      },
    ],
  },
  {
    name: 'Fase 2',
    subtitle: 'Datos y Mercado',
    icon: Target,
    accent: 'blue-light',
    events: [
      {
        id: 5,
        week: 5,
        title: 'Enfoque Social en Marketing',
        date: 'Lunes 23 de febrero',
        time: '15:30 - 17:00',
        speaker: 'Oscar Naranjo del Giudice',
        type: 'Virtual',
        description:
          'Perspectivas sobre marketing social, impacto en comunidades y responsabilidad corporativa en la investigación de mercados.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      },
      {
        id: 6,
        week: 6,
        title: 'Taller de Análisis Cuantitativo',
        date: 'Lunes 02 de marzo',
        time: '15:30 - 17:00',
        speaker: 'Camilo Rojas Contreras',
        type: 'Presencial',
        description:
          'Taller práctico de herramientas estadísticas para el análisis de datos de mercado. SPSS, R y técnicas de modelado.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      },
      {
        id: 7,
        week: 7,
        title: 'Consumer Insights',
        date: 'Lunes 09 de marzo',
        time: '15:30 - 17:00',
        speaker: 'Consultora en Investigación de Mercados',
        type: 'Virtual',
        description:
          'Descubrimiento de insights profundos del consumidor mediante técnicas avanzadas de investigación aplicada.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      },
      {
        id: 8,
        week: 8,
        title: 'Pitch de Ideas de Investigación',
        date: 'Lunes 16 de marzo',
        time: '15:30 - 17:00',
        speaker: 'Miembros del Club',
        type: 'Presencial',
        description:
          'Presentación de propuestas de investigación por parte de los equipos. Feedback constructivo y selección de proyectos.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      },
    ],
  },
  {
    name: 'Fase 3',
    subtitle: 'Profundización',
    icon: Sparkles,
    accent: 'orange',
    events: [
      {
        id: 9,
        week: 9,
        title: 'Marketing de Lujo y Exclusividad',
        date: 'Lunes 23 de marzo',
        time: '15:30 - 17:00',
        speaker: 'Aniket Sengupta',
        type: 'Virtual',
        description:
          'Estrategias de marketing para marcas de lujo, gestión de exclusividad y comportamiento del consumidor de alta gama.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      },
      {
        id: 10,
        week: 10,
        title: 'Métodos Cualitativos y Mixtos en Marketing',
        date: 'Lunes 30 de marzo',
        time: '15:30 - 17:00',
        speaker: 'Andrés Barrios',
        type: 'Híbrido',
        description:
          'Diseño e implementación de estudios cualitativos y métodos mixtos para investigación de mercados profunda.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
      },
      {
        id: 11,
        week: 11,
        title: 'Avances de Proyectos',
        date: 'Lunes 06 de abril',
        time: '15:30 - 17:00',
        speaker: 'Miembros del Club',
        type: 'Presencial',
        description:
          'Sesión de seguimiento donde cada equipo presenta los avances de su proyecto de investigación y recibe retroalimentación.',
        image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80',
      },
      {
        id: 12,
        week: 12,
        title: 'IA en Investigación',
        date: 'Lunes 13 de abril',
        time: '15:30 - 17:00',
        speaker: 'Camilo Rojas Contreras',
        type: 'Virtual',
        description:
          'Aplicaciones de inteligencia artificial en la investigación de mercados: automatización, análisis predictivo y generación de insights.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      },
    ],
  },
  {
    name: 'Fase 4',
    subtitle: 'Integración Final',
    icon: Award,
    accent: 'yellow',
    events: [
      {
        id: 13,
        week: 13,
        title: 'Conferencia Tendencias Globales en Investigaciones de Mercado',
        date: 'Lunes 20 de abril',
        time: '15:30 - 17:00',
        speaker: 'Consultora en Investigación de Mercados',
        type: 'Virtual',
        description:
          'Panorama global de las tendencias emergentes en investigación de mercados y su aplicación en contextos latinoamericanos.',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      },
      {
        id: 14,
        week: 14,
        title: 'Comunicación Científica y Diseño',
        date: 'Lunes 27 de abril',
        time: '15:30 - 17:00',
        speaker: 'Equipo del Club',
        type: 'Presencial',
        description:
          'Técnicas de comunicación científica efectiva, diseño de presentaciones y preparación de artículos académicos.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      },
      {
        id: 15,
        week: 15,
        title: 'Trabajos Generales',
        date: 'Lunes 04 de mayo',
        time: '15:30 - 17:00',
        speaker: 'Miembros del Club',
        type: 'Presencial',
        description:
          'Sesión de trabajo colaborativo para finalizar los proyectos de investigación y preparar las presentaciones finales.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      },
      {
        id: 16,
        week: 16,
        title: 'DEMO DAY',
        date: 'Lunes 11 de mayo',
        time: '15:30 - 17:00',
        speaker: 'Miembros del Club + Jurado',
        type: 'Presencial',
        description:
          'Evento final donde los equipos presentan sus proyectos completos ante un jurado de expertos. Premiación a los mejores trabajos.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      },
    ],
  },
];

export const allEvents: ProgramEvent[] = phases.flatMap((phase) => phase.events);
