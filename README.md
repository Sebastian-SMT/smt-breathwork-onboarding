# SMT Breathwork® – Bewerbungs-Onboarding

Premium-Bewerbungs-App als React/Vite/TypeScript-Anwendung. Ersetzt das
bisherige Google-Formular durch ein mehrstufiges, hochwertiges Onboarding
mit direkt eingebettetem YouCanBookMe-Kalender am Ende.

## Setup

```bash
npm install
cp .env.example .env
# .env mit deinem n8n-Webhook und deiner YouCanBookMe-URL befüllen
npm run dev
```

## Build & Deploy (eigener Server / Nginx)

```bash
npm run build
```

Das Ergebnis liegt in `dist/` und kann direkt per Nginx als statische
Seite ausgeliefert werden (z. B. via `root` auf den `dist`-Ordner zeigen
lassen, `try_files $uri /index.html;` für clientseitiges Routing – hier
aktuell nicht zwingend nötig, da es nur eine Route gibt).

## Projektstruktur

```
src/
  components/
    layout/       Hero, PageShell
    onboarding/   ProgressBar, StepCard, NavigationButtons, Steps, Success, Calendar
    ui/           TextField, TextAreaField, RadioCard, Checkbox
  config/         Texte & Schritt-Definitionen (steps.ts), globale Konstanten
  hooks/          useOnboardingForm (Zustand), useLocalStorage
  services/       api.ts (n8n-Übermittlung via React Query)
  types/          Zod-Schema + TypeScript-Typen
  utils/          UTM-/Click-ID-Tracking, Metadaten
```

## Texte anpassen

Alle sichtbaren Texte (Hero, Fragen, Erfolgsmeldung) liegen zentral in
`src/config/constants.ts` und `src/config/steps.ts` – keine Suche durch
Komponenten nötig.

## n8n-Payload

```json
{
  "data": {
    "email": "...",
    "name": "...",
    "selfEmploymentStatus": "...",
    "motivation": "...",
    "targetAudience": "...",
    "candidateFit": "...",
    "scopeConfirmed": "ja",
    "bookingIntentConfirmed": true
  },
  "metadata": {
    "timestamp": "...",
    "browser": "...",
    "referrer": "...",
    "landingPage": "...",
    "screenResolution": "...",
    "timezone": "...",
    "language": "...",
    "userAgent": "...",
    "utm": { "utm_source": "...", "utm_medium": "...", "...": "..." },
    "clickIds": { "fbclid": "...", "gclid": "...", "ttclid": "..." }
  }
}
```

Erwartete Webhook-Antwort: `{ "success": true }`
