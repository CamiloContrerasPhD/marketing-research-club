/**
 * Isotipo del Marketing Research Club.
 *
 * Geometría tomada del manual de identidad (monograma isométrico "M").
 * Las tres caras se colorean de forma independiente para soportar las
 * variantes definidas en el manual:
 *   - "principal": azules, para contextos institucionales y formales.
 *   - "secundaria": azul + naranja + amarillo, para piezas de mayor visibilidad.
 *   - "blanco": monocromo, para fondos de color saturado.
 */

const FACE_MAIN = '467,73 581,139 292,305 292,440 115,341 115,584 0,518 0,138 179,240';
const FACE_MID = '407,239 407,619 292,684 292,305';
const FACE_SIDE = '581,140 581,515 468,450 468,205';

export type IsotipoVariant = 'principal' | 'secundaria' | 'blanco';

const PALETTES: Record<IsotipoVariant, [string, string, string]> = {
  principal: ['#3b5fc4', '#254291', '#192e64'],
  secundaria: ['#254291', '#ff5d00', '#fdb600'],
  blanco: ['#ffffff', '#ffffff', '#c9d4ee'],
};

export function Isotipo({
  variant = 'principal',
  className = '',
}: {
  variant?: IsotipoVariant;
  className?: string;
}) {
  const [main, mid, side] = PALETTES[variant];
  return (
    <svg
      viewBox="0 0 581 684"
      className={className}
      role="img"
      aria-label="Marketing Research Club"
      focusable="false"
    >
      <polygon points={FACE_MAIN} fill={main} />
      <polygon points={FACE_SIDE} fill={side} />
      <polygon points={FACE_MID} fill={mid} />
    </svg>
  );
}

/**
 * Logo completo: isotipo + tipografía DM Sans en tres líneas, como en el manual.
 * El texto se renderiza en HTML (no dentro del SVG) para que herede la fuente
 * de la página y no dependa de que DM Sans esté instalada en el sistema.
 */
export function Logo({
  variant = 'principal',
  tone = 'ink',
  className = '',
  markClassName = 'h-11',
}: {
  variant?: IsotipoVariant;
  tone?: 'ink' | 'blanco';
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Isotipo variant={variant} className={`${markClassName} w-auto shrink-0`} />
      <span
        className={`text-[0.86rem] font-bold leading-[1.05] tracking-tight sm:text-[0.95rem] ${
          tone === 'blanco' ? 'text-white' : 'text-mrc-ink'
        }`}
      >
        Marketing
        <br />
        Research
        <br />
        Club
      </span>
    </span>
  );
}
