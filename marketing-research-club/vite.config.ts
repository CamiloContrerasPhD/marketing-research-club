import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
// `base: './'` mantiene las rutas relativas para que el sitio funcione
// tanto en la raíz de un dominio como en un subdirectorio de GitHub Pages
// (https://<usuario>.github.io/<repositorio>/).
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
