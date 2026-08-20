# Marketing Research Club

Sitio web del **Marketing Research Club**, semillero de investigación del Área de
Mercadeo de la Facultad de Administración de la Universidad de los Andes.

Publica el calendario del programa (16 semanas en 4 fases), la información del
semillero y los formularios de inscripción.

## Identidad de marca

El diseño sigue el manual de identidad del club.

| Rol | Color | Uso |
| --- | --- | --- |
| Azul principal | `#254291` | Color dominante: fondos, bloques principales, logo |
| Azul profundo | `#192e64` | Secciones oscuras, footer |
| Azul claro | `#3b5fc4` | Degradados y cara clara del isotipo |
| Amarillo | `#fdb600` | Acento: CTA, destacados, subrayados |
| Naranja | `#ff5d00` | Acento secundario |
| Neutros | `#2e2e2e` `#6b6b6b` `#ffffff` `#f4f6fb` | Texto, fondos, descanso visual |

Regla del manual respetada en todo el sitio: **el azul predomina**; amarillo y
naranja aparecen solo como énfasis, nunca en la misma proporción que el azul.

Tipografía: **DM Sans** (Black/ExtraBold para títulos, SemiBold/Medium para
subtítulos, Regular/Light para párrafos).

Los logos viven en `public/brand/` y son SVG vectoriales:

- `isotipo-principal.svg` — isotipo azul, contextos institucionales
- `isotipo-secundario.svg` — isotipo tricolor, mayor visibilidad
- `isotipo-blanco.svg` — monocromo para fondos saturados
- `logo-*.svg` — bloque completo con la firma tipográfica
- `favicon.svg`

En la interfaz el isotipo se renderiza con el componente
`src/components/brand/Isotipo.tsx`, de modo que la firma tipográfica use la
DM Sans cargada por la página.

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # compila a dist/
npm run preview  # sirve el build compilado
```

## Publicación

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que compila el
proyecto y lo publica en GitHub Pages. Para activarlo la primera vez:
**Settings → Pages → Source: GitHub Actions**.

`vite.config.ts` usa `base: './'`, así que el sitio funciona tanto en la raíz de
un dominio como en un subdirectorio (`https://usuario.github.io/repositorio/`).

## Estructura

```
src/
  App.tsx                     página completa
  components/SiteHeader.tsx   header fijo + menú móvil
  components/brand/Isotipo.tsx  isotipo y logo del club
  components/ui/              primitivas shadcn/ui (button, dialog)
  data/program.ts             agenda, fases y enlaces de formularios
public/brand/                 logos SVG
```

## Formularios

- La inscripción al club abre un Google Form (`CLUB_FORM_URL` en `src/data/program.ts`).
- La inscripción a sesiones individuales se envía por Formspree (`FORMSPREE_ENDPOINT`).

Ambos endpoints son públicos por diseño; no hay claves ni secretos en el
repositorio.
