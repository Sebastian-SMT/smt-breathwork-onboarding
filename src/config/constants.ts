/**
 * Zentrale Konfiguration. Texte hier ändern statt in Komponenten zu suchen.
 */
export const N8N_WEBHOOK_URL: string =
  import.meta.env.VITE_N8N_WEBHOOK_URL ?? 'https://n8n.example.com/webhook/bewerbung';

export const YOUCANBOOKME_URL: string =
  import.meta.env.VITE_YOUCANBOOKME_URL ?? 'https://youcanbook.me/dein-kalender';

export const STORAGE_KEY = 'smt-bewerbung-draft-v1';

export const HERO_CONTENT = {
  eyebrow: 'SMT Breathwork® Ausbildung',
  title: 'Deine Bewerbung für die SMT Breathwork® Ausbildung',
  subtitle:
    'Ein kurzer, persönlicher Prozess – damit unser gemeinsames Gespräch von Anfang an zielgerichtet ist.',
};

export const SUCCESS_CONTENT = {
  title: 'Perfekt!',
  body: 'Vielen Dank. Deine Bewerbung wurde erfolgreich gespeichert.\nIm nächsten Schritt kannst du dir direkt einen Termin aussuchen.',
  cta: 'Termin auswählen',
};

export const TOTAL_STEPS = 7;
