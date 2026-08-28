/**
 * Revisa sessions.json antes de compilar.
 *
 * Existe para que un error de edición produzca un mensaje entendible
 * ("a la sesión 3 de la Fase 2 le falta 'ponente'") en vez de un fallo
 * de TypeScript difícil de leer.
 *
 * Uso: node scripts/validar-sesiones.mjs
 */
import { readFileSync } from 'node:fs';

const RUTA = 'src/data/sessions.json';
const CAMPOS = ['semana', 'titulo', 'fecha', 'hora', 'ponente', 'modalidad', 'descripcion'];
const MODALIDADES = ['presencial', 'virtual', 'hibrido', 'híbrido'];

const errores = [];
let datos;

try {
  datos = JSON.parse(readFileSync(RUTA, 'utf8'));
} catch (e) {
  console.error(`\n✖ ${RUTA} no es JSON válido.\n  ${e.message}\n`);
  console.error('  Suele ser una coma de más al final de una lista, o comillas sin cerrar.\n');
  process.exit(1);
}

for (const clave of ['dia', 'horario', 'anio']) {
  if (!datos.programa?.[clave]) errores.push(`"programa" no tiene "${clave}"`);
}

if (!Array.isArray(datos.fases) || datos.fases.length === 0) {
  errores.push('"fases" debe ser una lista con al menos una fase');
}

let total = 0;
datos.fases?.forEach((fase, i) => {
  const nombreFase = fase.nombre ?? `fase ${i + 1}`;
  if (!Array.isArray(fase.sesiones)) {
    errores.push(`${nombreFase}: "sesiones" debe ser una lista`);
    return;
  }
  fase.sesiones.forEach((s, j) => {
    total++;
    const donde = `${nombreFase}, sesión ${j + 1}`;
    for (const campo of CAMPOS) {
      if (s[campo] === undefined || s[campo] === '') {
        errores.push(`${donde}: falta "${campo}"`);
      }
    }
    if (s.modalidad && !MODALIDADES.includes(String(s.modalidad).toLowerCase())) {
      errores.push(`${donde}: "modalidad" dice "${s.modalidad}"; usa Presencial, Virtual o Híbrido`);
    }
  });
});

if (errores.length) {
  console.error(`\n✖ ${errores.length} problema(s) en ${RUTA}:\n`);
  errores.forEach((e) => console.error(`  · ${e}`));
  console.error('');
  process.exit(1);
}

console.log(`✓ ${RUTA}: ${total} sesiones, ${datos.fases.length} fases, ${datos.programa.dia} ${datos.programa.horario}`);
