/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050505', // Lienzo negro profundo
          900: '#0A0A0A', // Fondo global con sutil matiz
          850: '#121212', // Contenedores de tarjeta base
          800: '#181818', // Bordes e inputs neutros
          700: '#252525', // Divisores tenues
        },
        neon: {
          yellow: '#FFE800', // Títulos H1 (Energía y creatividad)
          cyan: '#00F3FF',   // Títulos H2 / Módulos (Tecnología y confianza)
          pink: '#FF00FF',   // Subtítulos H3 / Precios / Destacados
          green: '#00FF66',  // Botones Primarios / Éxito / Confirmación
          orange: '#FF5E00', // Botones Secundarios / Alertas
        },
      },
      fontFamily: {
        neon: ['Yellowtail', 'cursive'],
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-yellow': '0 0 10px rgba(255, 232, 0, 0.4), 0 0 25px rgba(255, 232, 0, 0.2)',
        'neon-cyan': '0 0 10px rgba(0, 243, 255, 0.4), 0 0 25px rgba(0, 243, 255, 0.2)',
        'neon-pink': '0 0 10px rgba(255, 0, 255, 0.4), 0 0 25px rgba(255, 0, 255, 0.2)',
        'neon-green': '0 0 12px rgba(0, 255, 102, 0.45), 0 0 30px rgba(0, 255, 102, 0.25)',
        'neon-orange': '0 0 12px rgba(255, 94, 0, 0.45), 0 0 30px rgba(255, 94, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
      },
    },
  },
  plugins: [],
};
