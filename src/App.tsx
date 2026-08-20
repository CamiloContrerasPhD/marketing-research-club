import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Send,
  User,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SiteHeader } from '@/components/SiteHeader';
import { Isotipo, Logo } from '@/components/brand/Isotipo';
import {
  AREA_URL,
  CLUB_FORM_URL,
  EMAIL_RECIPIENT,
  FORMSPREE_ENDPOINT,
  allEvents,
  phases,
  type ProgramEvent,
  type SessionType,
} from '@/data/program';

/** Cromática de las etiquetas de modalidad, sobre la paleta oficial. */
const TYPE_STYLES: Record<SessionType, string> = {
  Virtual: 'bg-mrc-blue/10 text-mrc-blue border-mrc-blue/20',
  Presencial: 'bg-mrc-orange/10 text-mrc-orange-deep border-mrc-orange/25',
  Híbrido: 'bg-mrc-yellow/15 text-mrc-yellow-deep border-mrc-yellow/35',
};

const PHASE_ACCENT: Record<string, { bar: string; icon: string }> = {
  blue: { bar: 'bg-mrc-blue', icon: 'text-mrc-blue-light' },
  'blue-light': { bar: 'bg-mrc-blue-light', icon: 'text-mrc-blue-light' },
  orange: { bar: 'bg-mrc-orange', icon: 'text-mrc-orange' },
  yellow: { bar: 'bg-mrc-yellow', icon: 'text-mrc-yellow' },
};

function App() {
  const [selectedEvent, setSelectedEvent] = useState<ProgramEvent | null>(null);
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [sessionForm, setSessionForm] = useState({ nombre: '', email: '', sesion: '' });
  const [sessionSubmitting, setSessionSubmitting] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSessionSubmitting(true);
    setSessionError(null);

    const selected = allEvents.find((ev) => ev.id.toString() === sessionForm.sesion);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'Inscripción Sesión Semillero',
          email: EMAIL_RECIPIENT,
          nombre: sessionForm.nombre,
          correo: sessionForm.email,
          sesion: selected ? `Semana ${selected.week}: ${selected.title}` : 'No especificada',
          fecha: selected?.date ?? 'N/A',
          hora: selected?.time ?? 'N/A',
          message: [
            'Nueva inscripción a sesión del Marketing Research Club:',
            '',
            `Nombre: ${sessionForm.nombre}`,
            `Correo: ${sessionForm.email}`,
            `Sesión: ${selected ? `Semana ${selected.week} - ${selected.title}` : 'No especificada'}`,
            `Fecha: ${selected?.date ?? 'N/A'}`,
            `Hora: ${selected?.time ?? 'N/A'}`,
          ].join('\n'),
        }),
      });

      if (!response.ok) throw new Error('respuesta no satisfactoria');

      setSessionSuccess(true);
      window.setTimeout(() => {
        setSessionDialogOpen(false);
        setSessionSuccess(false);
        setSessionForm({ nombre: '', email: '', sesion: '' });
      }, 2200);
    } catch {
      setSessionError(
        'No pudimos enviar tu inscripción. Intenta de nuevo o escríbenos al correo del semillero.',
      );
    } finally {
      setSessionSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-mrc-blue/20 bg-white px-4 py-3 text-mrc-ink outline-none transition-colors placeholder:text-mrc-gray/70 focus:border-mrc-blue focus:ring-2 focus:ring-mrc-blue/20';

  return (
    <div id="top" className="min-h-screen bg-white font-sans text-mrc-ink">
      <SiteHeader />

      {/* ================= HERO — azul de marca dominante ================= */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-mrc-blue-deep">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,#3b5fc4_0%,#254291_42%,#192e64_100%)]" />
        <div className="mrc-iso-grid absolute inset-0 opacity-70" />
        {/* Acentos cromáticos, en proporción menor que el azul (regla del manual) */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-mrc-orange/25 blur-[110px]" />
        <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-mrc-yellow/20 blur-[110px]" />
        {/* Isotipo gigante como elemento gráfico */}
        <Isotipo
          variant="blanco"
          className="pointer-events-none absolute -right-10 bottom-0 hidden h-[78%] w-auto opacity-[0.07] lg:block"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-6 lg:pt-36">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-mrc-yellow sm:text-xs">
              Facultad de Administración · Universidad de los Andes
            </p>
            <h1 className="text-[2.6rem] font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Investigación Científica
              <br />
              para <span className="mrc-highlight text-white">Decisiones en Marketing</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-white/75 sm:text-xl">
              Semillero de investigación del Área de Mercadeo. Dieciséis semanas para
              aprender proponer preguntar de negocio con visión científica, medir y traducir evidencia en
              estrategia.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={CLUB_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-reveal inline-flex items-center justify-center gap-2 rounded-xl bg-mrc-yellow px-8 py-4 text-base font-bold uppercase tracking-wide text-mrc-blue-deep transition-colors hover:bg-mrc-yellow-deep"
              >
                Únete al Club
                <ExternalLink className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setSessionDialogOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-mrc-blue-deep"
              >
                <Video className="h-5 w-5" />
                Inscríbete a una sesión
              </button>
            </div>

            <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/60">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-mrc-yellow" /> Lunes, 15:30 – 17:00
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mrc-yellow" /> Bogotá · presencial y virtual
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= CIFRAS — claro ================= */}
      <section className="border-b border-mrc-blue/10 bg-white py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '16', label: 'Semanas de programa' },
              { number: '4', label: 'Fases de aprendizaje' },
              { number: '12+', label: 'Invitados expertos' },
              { number: '8+', label: 'Años de trayectoria' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in text-center"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <p className="text-4xl font-black text-mrc-blue md:text-5xl">{stat.number}</p>
                <p className="mt-2 text-sm font-semibold text-mrc-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AGENDA — claro ================= */}
      <section id="agenda" className="bg-mrc-paper-alt py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-mrc-blue">
              Programa 2026
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-mrc-blue-deep md:text-5xl">
              Agenda
            </h2>
            <div className="mrc-rule mt-5" />
            <p className="mt-6 text-lg text-mrc-gray">
              Dieciséis semanas organizadas en cuatro fases. Todos los encuentros son los{' '}
              <strong className="font-bold text-mrc-blue">lunes de 15:30 a 17:00</strong>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {allEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="hover-lift group overflow-hidden rounded-2xl border border-mrc-blue/10 bg-white text-left shadow-sm hover:border-mrc-blue/30"
              >
                <div className="image-hover-zoom relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mrc-blue-deep/45 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-mrc-blue px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide text-white">
                    Semana {event.week}
                  </span>
                  <span
                    className={`absolute right-3 top-3 rounded-full border bg-white px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wide ${TYPE_STYLES[event.type]}`}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mrc-gray">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-mrc-orange" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-mrc-orange" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-lg font-bold leading-tight text-mrc-blue-deep transition-colors group-hover:text-mrc-blue">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 shrink-0 text-mrc-blue-light" />
                    <span className="font-medium text-mrc-gray">{event.speaker}</span>
                  </div>

                  <span className="mt-4 flex items-center gap-2 border-t border-mrc-blue/10 pt-4 text-sm font-bold text-mrc-blue opacity-0 transition-opacity group-hover:opacity-100">
                    Ver detalles
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FASES — azul profundo ================= */}
      <section id="fases" className="relative overflow-hidden bg-mrc-blue-deep py-20 sm:py-24">
        <div className="mrc-iso-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-mrc-yellow">
              Estructura del programa
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
              Cuatro fases de aprendizaje
            </h2>
            <div className="mrc-rule mt-5" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase) => {
              const accent = PHASE_ACCENT[phase.accent];
              return (
                <div
                  key={phase.name}
                  className="hover-lift relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm"
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${accent.bar}`} />
                  <phase.icon className={`mb-5 h-8 w-8 ${accent.icon}`} />
                  <h3 className="text-xl font-black text-white">{phase.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white/65">{phase.subtitle}</p>
                  <span className="mt-5 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                    {phase.events.length} sesiones
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= NOSOTROS — claro ================= */}
      <section id="nosotros" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-mrc-blue">
                Sobre nosotros
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight text-mrc-blue-deep md:text-5xl">
                Arquitectura del criterio
              </h2>
              <div className="mrc-rule mt-5" />
              <p className="mt-6 text-lg leading-relaxed text-mrc-gray">
                El Marketing Research Club es una comunidad dedicada al estudio y la
                aplicación de la investigación científica en mercadeo. Reunimos estudiantes,
                profesores y profesionales interesados en comprender el comportamiento del
                consumidor, generar conocimiento relevante y promover decisiones
                fundamentadas en evidencia.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-mrc-gray">
                Entendemos la investigación no como un ejercicio académico aislado, sino
                como una herramienta para interpretar mercados, reducir incertidumbre y
                construir mejores estrategias.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ['Pensamiento crítico', 'Cuestionamos antes de aceptar.'],
                  ['Rigor académico', 'Metodología sólida como fundamento.'],
                  ['Investigación aplicada', 'Del paper al problema real.'],
                  ['Vanguardia', 'Una disciplina en evolución constante.'],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-mrc-blue/10 bg-mrc-paper-alt p-4"
                  >
                    <p className="text-sm font-bold text-mrc-blue">{title}</p>
                    <p className="mt-1 text-sm text-mrc-gray">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                  alt="Miembros del semillero trabajando en equipo"
                  loading="lazy"
                  className="hover-zoom h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-mrc-yellow p-6 shadow-brand sm:-left-6">
                <p className="text-3xl font-black text-mrc-blue-deep">#1</p>
                <p className="mt-1 text-xs font-bold uppercase leading-tight tracking-wide text-mrc-blue-deep/75">
                  En Colombia
                  <br />
                  QS Ranking 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ÁREA DE MERCADEO — azul profundo ================= */}
      <section id="area" className="relative overflow-hidden bg-mrc-blue-deep py-20 sm:py-24">
        <div className="mrc-iso-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&q=80"
                  alt="Área de Mercadeo de la Facultad de Administración"
                  loading="lazy"
                  className="hover-zoom h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl border border-mrc-yellow/30 bg-mrc-blue-ink p-6 shadow-brand sm:-right-6">
                <p className="text-3xl font-black text-mrc-yellow">Top 51-100</p>
                <p className="mt-1 text-xs font-bold uppercase leading-tight tracking-wide text-white/65">
                  En el mundo
                  <br />
                  Marketing QS 2025
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-mrc-yellow">
                Área académica
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Área de Mercadeo
              </h2>
              <div className="mrc-rule mt-5" />
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                El Área de Mercadeo de la Facultad de Administración de la Universidad de
                los Andes contribuye al desarrollo sostenible de las organizaciones y al
                bienestar social mediante la generación, divulgación y transferencia de
                conocimiento.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                Lidera la maestría en mercadeo y la especialización en inteligencia de
                mercados, referencia en Colombia, además de cursos de pregrado, semilleros
                de investigación y acompañamiento a estudiantes doctorales.
              </p>

              <div className="mt-8 grid max-w-sm grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <p className="text-2xl font-black text-mrc-yellow">#1</p>
                  <p className="text-xs font-medium text-white/60">Colombia</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <p className="text-2xl font-black text-mrc-yellow">#4</p>
                  <p className="text-xs font-medium text-white/60">Latinoamérica</p>
                </div>
              </div>

              <a
                href={AREA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-mrc-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-mrc-blue-deep transition-colors hover:bg-mrc-yellow-deep"
              >
                Visitar Área de Mercadeo
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL — amarillo de acento ================= */}
      <section className="bg-mrc-yellow py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <Isotipo variant="principal" className="mx-auto h-14 w-auto" />
          <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight text-mrc-blue-deep md:text-5xl">
            Únete a la comunidad
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-mrc-blue-deep/75">
            Dieciséis semanas de formación, networking y proyectos de investigación
            aplicada. Abierto a estudiantes de todas las carreras.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={CLUB_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reveal inline-flex items-center justify-center gap-2 rounded-xl bg-mrc-blue-deep px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-mrc-blue"
            >
              Inscribirme al club
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setSessionDialogOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-mrc-blue-deep px-8 py-4 text-base font-bold uppercase tracking-wide text-mrc-blue-deep transition-colors hover:bg-mrc-blue-deep hover:text-mrc-yellow"
            >
              <Video className="h-5 w-5" />
              Inscribirme a una sesión
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-mrc-paper-ink py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <Logo variant="blanco" tone="blanco" markClassName="h-11" />
              <span className="hidden h-10 w-px bg-white/15 sm:block" />
              <img
                src="./logo-universidad.png"
                alt="Universidad de los Andes"
                className="h-9 w-auto object-contain opacity-80"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white/60">
                © 2026 Marketing Research Club · Universidad de los Andes
              </p>
              <p className="mt-1 text-xs text-white/40">
                Facultad de Administración · Área de Mercadeo · Bogotá, Colombia
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= DIÁLOGO: detalle de sesión ================= */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-lg border-mrc-blue/15 bg-white text-mrc-ink">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-mrc-blue-deep">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-mrc-gray">
              Semana {selectedEvent?.week} del programa
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img
                src={selectedEvent?.image}
                alt=""
                className="h-full w-full object-cover"
              />
              {selectedEvent && (
                <span
                  className={`absolute right-3 top-3 rounded-full border bg-white px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wide ${TYPE_STYLES[selectedEvent.type]}`}
                >
                  {selectedEvent.type}
                </span>
              )}
            </div>

            <p className="text-mrc-gray">{selectedEvent?.description}</p>

            <div className="space-y-3 rounded-xl bg-mrc-paper-alt p-4 text-sm">
              <div className="flex items-center gap-3 text-mrc-ink">
                <Calendar className="h-4 w-4 text-mrc-blue" />
                <span className="font-medium">{selectedEvent?.date}</span>
              </div>
              <div className="flex items-center gap-3 text-mrc-ink">
                <Clock className="h-4 w-4 text-mrc-blue" />
                <span className="font-medium">{selectedEvent?.time}</span>
              </div>
              <div className="flex items-center gap-3 text-mrc-ink">
                <User className="h-4 w-4 text-mrc-blue" />
                <span className="font-medium">{selectedEvent?.speaker}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                if (selectedEvent) {
                  setSessionForm((f) => ({ ...f, sesion: selectedEvent.id.toString() }));
                }
                setSelectedEvent(null);
                setSessionDialogOpen(true);
              }}
              className="w-full bg-mrc-blue py-6 text-base font-bold text-white hover:bg-mrc-blue-deep"
            >
              Inscribirme a esta sesión
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================= DIÁLOGO: inscripción a sesión ================= */}
      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="max-w-md border-mrc-blue/15 bg-white text-mrc-ink">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-mrc-blue-deep">
              Inscríbete a una sesión
            </DialogTitle>
            <DialogDescription className="text-mrc-gray">
              Selecciona la sesión a la que deseas asistir
            </DialogDescription>
          </DialogHeader>

          {sessionSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-mrc-blue" />
              <h3 className="text-xl font-bold text-mrc-blue-deep">¡Inscripción enviada!</h3>
              <p className="mt-1 text-mrc-gray">Te contactaremos con los detalles.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSessionSubmit}>
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-1 block text-sm font-semibold text-mrc-ink"
                >
                  Nombre completo *
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={sessionForm.nombre}
                  onChange={(e) => setSessionForm({ ...sessionForm, nombre: e.target.value })}
                  className={inputClass}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="correo"
                  className="mb-1 block text-sm font-semibold text-mrc-ink"
                >
                  Correo electrónico *
                </label>
                <input
                  id="correo"
                  type="email"
                  required
                  value={sessionForm.email}
                  onChange={(e) => setSessionForm({ ...sessionForm, email: e.target.value })}
                  className={inputClass}
                  placeholder="tu@uniandes.edu.co"
                />
              </div>
              <div>
                <label
                  htmlFor="sesion"
                  className="mb-1 block text-sm font-semibold text-mrc-ink"
                >
                  Sesión *
                </label>
                <select
                  id="sesion"
                  required
                  value={sessionForm.sesion}
                  onChange={(e) => setSessionForm({ ...sessionForm, sesion: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Elige una sesión</option>
                  {allEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      Semana {event.week}: {event.title} — {event.date}
                    </option>
                  ))}
                </select>
              </div>

              {sessionError && (
                <p className="rounded-lg bg-mrc-orange/10 px-3 py-2 text-sm font-medium text-mrc-orange-deep">
                  {sessionError}
                </p>
              )}

              <Button
                type="submit"
                disabled={sessionSubmitting}
                className="w-full bg-mrc-blue py-6 text-base font-bold text-white hover:bg-mrc-blue-deep disabled:opacity-60"
              >
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {sessionSubmitting ? 'Enviando…' : 'Confirmar inscripción'}
                </span>
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
