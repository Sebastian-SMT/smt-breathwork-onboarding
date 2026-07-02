import { selfEmploymentOptions, confirmationOptions } from '@/types/form';

/**
 * Reihenfolge und Texte 1:1 aus dem bestehenden Google-Formular übernommen,
 * damit bisherige Auswertungen (Sheets, ActiveCampaign) kompatibel bleiben.
 */
export type StepId =
  | 'contact'
  | 'selfEmployment'
  | 'motivation'
  | 'targetAudience'
  | 'candidateFit'
  | 'confirmation'
  | 'bookingIntent';

export interface StepDefinition {
  id: StepId;
  index: number; // 1-basiert, für "Schritt X von 7"
}

export const steps: StepDefinition[] = [
  { id: 'contact', index: 1 },
  { id: 'selfEmployment', index: 2 },
  { id: 'motivation', index: 3 },
  { id: 'targetAudience', index: 4 },
  { id: 'candidateFit', index: 5 },
  { id: 'confirmation', index: 6 },
  { id: 'bookingIntent', index: 7 },
];

export const copy = {
  contact: {
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'deine@email.de',
    nameLabel: 'Vor- und Nachname',
    namePlaceholder: 'Vor- und Nachname',
  },
  selfEmployment: {
    question: 'Bist du schon haupt- oder nebenberuflich selbstständig?',
    options: selfEmploymentOptions,
  },
  motivation: {
    question: 'Warum genau möchtest du die Ausbildung machen?',
  },
  targetAudience: {
    question:
      'Wer ist deine Zielgruppe? (grob) Mit wem arbeitest du am liebsten? (oder möchtest in Zukunft am liebsten arbeiten)',
  },
  candidateFit: {
    question:
      'Was macht dich zu einem passenden Kandidaten für die Ausbildung? (Welche Eigenschaften besitzt du, die eine perfekte Basis dafür sind, SMT Breathwork® Sessions zu geben?)',
  },
  confirmation: {
    question:
      'Mir ist bekannt, dass die Ausbildung auf die Begleitung von Endkunden und die berufliche Anwendung ausgerichtet ist',
    options: confirmationOptions,
    blockingValue: 'Nein' as const,
    blockedMessage:
      'Diese Ausbildung ist auf die berufliche Anwendung mit Endkunden ausgerichtet. Mit "Nein" können wir dich aktuell leider nicht weiterführen.',
  },
  bookingIntent: {
    label: 'Falls es später zu einer Buchung der Ausbildung kommt:',
    checkboxText:
      'Ich buche die Ausbildung überwiegend zu beruflichen bzw. selbstständigen Zwecken. Ziel der Teilnahme ist die Anwendung der Ausbildungsinhalte im Rahmen meiner beruflichen Tätigkeit oder des Aufbaus einer selbstständigen Tätigkeit.',
  },
};
