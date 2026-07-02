import { z } from 'zod';

/**
 * Erlaubte Antworten für die Selbstständigkeits-Frage (Schritt 2).
 * Die Strings sind bewusst identisch zum bestehenden Google-Formular,
 * damit Auswertungen (Sheets/ActiveCampaign) kompatibel bleiben.
 */
export const selfEmploymentOptions = [
  'ja, ich bin hauptberuflich selbstständig',
  'ja, ich bin nebenberuflich selbstständig',
  'ich bin noch nicht selbstständig, möchte es aber mit der Ausbildung werden',
] as const;

export const confirmationOptions = ['ja', 'Nein'] as const;

/**
 * Gesamtes Bewerbungs-Schema. Jede Stufe validiert nur ihren eigenen
 * Ausschnitt (siehe stepSchemas in config/steps.ts), aber am Ende wird
 * immer gegen dieses vollständige Schema geprüft, bevor gesendet wird.
 */
export const applicationSchema = z.object({
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
  name: z.string().min(2, 'Bitte gib deinen vollständigen Namen ein.'),
  selfEmploymentStatus: z.enum(selfEmploymentOptions, {
    errorMap: () => ({ message: 'Bitte wähle eine Option aus.' }),
  }),
  motivation: z.string().min(10, 'Bitte beschreibe kurz deine Motivation.'),
  targetAudience: z.string().min(10, 'Bitte beschreibe kurz deine Zielgruppe.'),
  candidateFit: z.string().min(10, 'Bitte beschreibe kurz deine Eignung.'),
  scopeConfirmed: z.literal('ja', {
    errorMap: () => ({
      message:
        'Die Ausbildung ist auf die berufliche Anwendung mit Endkunden ausgerichtet.',
    }),
  }),
  bookingIntentConfirmed: z.literal(true, {
    errorMap: () => ({ message: 'Bitte bestätige diese Angabe.' }),
  }),
});

export type ApplicationData = z.infer<typeof applicationSchema>;

/** Partieller Zustand während des Ausfüllens (noch nicht alle Felder gültig). */
export type ApplicationDraft = Partial<ApplicationData>;

/** Metadaten, die zusätzlich zu den Formularantworten an n8n gesendet werden. */
export interface SubmissionMetadata {
  timestamp: string;
  browser: string;
  referrer: string;
  landingPage: string;
  screenResolution: string;
  timezone: string;
  language: string;
  userAgent: string;
  utm: Record<string, string | undefined>;
  clickIds: Record<string, string | undefined>;
}

export interface SubmissionPayload {
  data: ApplicationData;
  metadata: SubmissionMetadata;
}
