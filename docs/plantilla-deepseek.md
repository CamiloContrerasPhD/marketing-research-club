# Plantilla de delegación a DeepSeek

Lo que se usó para redactar la sección "De la pregunta al resultado".
Sirve como molde para cualquier encargo de redacción con fuente cerrada.

## Parámetros

**`model: pro` siempre. Nunca `flash`.** Sin excepciones, ni para pruebas.

Las únicas perillas que se tocan son `thinking` y `effort`. No se pasa
`max_tokens`: en la práctica nunca se activó (topes de 900 y 1000 contra
salidas reales de 390 y 420) y acotar la salida puede romper el formato pedido.

**Si la llamada se queda colgada**, lo primero a probar es `thinking: false`.
Dos llamadas murieron por timeout con razonamiento activado y prompts largos,
sin llegar siquiera a facturar. No quedó aislada la variable, así que es una
hipótesis: pudo ser el thinking, el largo del prompt, o ambos.

**Partir en llamadas cortas.** Un solo prompt con ideación, debate y redacción
se cae. Dos llamadas de ~400 palabras de salida cada una funcionan.

Costo real de las dos llamadas de esta sección: **USD 0.0024**.

---

## Llamada 1 — Ideador y debate

**system**

```
Estratega de contenido para sitios universitarios, español de Colombia.
Directo, sin relleno.
```

**parámetros:** `model: pro`, `effort: high`, `thinking: false`

**prompt**

```
[CONTEXTO: qué es el sitio y qué secciones YA TIENE, para evitar solapamiento]

MATERIAL DISPONIBLE (fuente oficial, nada fuera de esto):
1. ...
2. ...
[lista numerada y compacta de los hechos disponibles]

TAREA (sé breve, máximo 350 palabras en total):
A) Propón 3 conceptos estructurales distintos para la sección.
   Una frase de idea rectora cada uno + qué bloques tendría.
B) Confróntalos. Di cuál es genérico, cuál se solapa con lo que ya existe,
   cuál exige datos que no tenemos. Elige uno y justifica en 2 frases.

No redactes todavía el texto final.
```

El valor está en **B**: obligarlo a atacar sus propias propuestas con tres
criterios concretos, no con un "¿cuál es mejor?" abierto.

---

## Llamada 2 — Redactor

**system** (aquí van todas las reglas de estilo, no en el prompt)

```
Redactor institucional universitario, español de Colombia. Registro profesional
y legible. Prohibido: "en un mundo donde", "no solo... sino también", "sumérgete",
"descubre", "potencia", "transforma", signos de admiración, preguntas retóricas
de relleno, frases que anuncian lo que viene. Máximo un guion largo en todo el
texto. Cero adjetivos vacíos (innovador, único, apasionante). Frases de longitud
variada. No inventes datos.
```

**parámetros:** `model: pro`, `effort: high`, `thinking: false`

**prompt**

```
Redacta la sección con el concepto ganador ("[nombre]": [estructura en flechas]).

Material permitido (no agregues nada más):
- ...
[repetir solo los hechos que van en esta sección]

NO menciones: [lo que ya está en otras partes del sitio]

Formato exacto de salida, sin comentarios adicionales:
ANTETITULO:
TITULO_SECCION:
ENTRADA: (45-65 palabras)
BLOQUE_1_TITULO:
BLOQUE_1_TEXTO: (28-42 palabras)
...
CIERRE: (máximo 20 palabras)
```

Pedir un **formato con etiquetas y conteo de palabras** es lo que hace la salida
utilizable sin reescribirla entera.

---

## Control de calidad (no delegable)

Revisar siempre estos cinco puntos antes de usar el resultado:

1. **Fugas del prompt.** Devolvió `ANTETITULO: Concepto ganador`, copiando una
   palabra de la instrucción. Pasa seguido.
2. **Nombres inconsistentes.** Escribió "el laboratorio" donde el sitio dice
   "el club". El modelo usa el vocabulario de la fuente, no el del destino.
3. **Densidad.** Comprimió dos temas distintos en un bloque ilegible por
   respetar el número de bloques pedido.
4. **Huérfanos.** Dejó el cierre como una lista sin marco.
5. **Hechos inventados.** No ocurrió esta vez, pero es lo primero que hay que
   contrastar contra la fuente.

## Cuándo no delegar

Si el trabajo son menos de ~5 ediciones puntuales, escribir el encargo cuesta
más que hacerlo. La delegación paga en volumen: redactar 16 descripciones,
traducir el sitio, procesar documentos largos, revisar un corpus.
