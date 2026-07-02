import type { Config } from 'tailwindcss';

// Marken-Tokens der SMT Breathwork Bewerbungs-App.
// Diese Datei ist die einzige Quelle der Wahrheit für Farben, Radius, Font.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F8FAFC',
        card: '#FFFFFF',
        brand: {
          DEFAULT: '#209999',
          hover: '#177373',
          light: '#F0FDFA',
        },
        ink: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          border: '#E2E8F0',
        },
        warn: {
          bg: '#FFF7ED',
          text: '#C2410C',
        },
      },
      borderRadius: {
        card: '20px',
        control: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config;
