import type { SubmissionMetadata } from '@/types/form';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const CLICK_ID_KEYS = ['fbclid', 'gclid', 'ttclid'] as const;

const TRACKING_STORAGE_KEY = 'smt-tracking-params-v1';

/**
 * Liest UTM-/Click-ID-Parameter aus der aktuellen URL und persistiert sie
 * in sessionStorage, damit sie auch nach internen Navigationen erhalten
 * bleiben (z. B. wenn der Nutzer die Seite neu lädt).
 */
export function captureAndPersistTrackingParams(): void {
  const params = new URLSearchParams(window.location.search);
  const hasAnyParam = [...UTM_KEYS, ...CLICK_ID_KEYS].some((key) => params.has(key));

  if (hasAnyParam) {
    const collected: Record<string, string> = {};
    [...UTM_KEYS, ...CLICK_ID_KEYS].forEach((key) => {
      const value = params.get(key);
      if (value) collected[key] = value;
    });
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(collected));
  }
}

function readPersistedTrackingParams(): Record<string, string | undefined> {
  try {
    const raw = sessionStorage.getItem(TRACKING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Baut das vollständige Metadaten-Objekt für die n8n-Übermittlung. */
export function buildSubmissionMetadata(): SubmissionMetadata {
  const persisted = readPersistedTrackingParams();

  const utm: Record<string, string | undefined> = {};
  UTM_KEYS.forEach((key) => (utm[key] = persisted[key]));

  const clickIds: Record<string, string | undefined> = {};
  CLICK_ID_KEYS.forEach((key) => (clickIds[key] = persisted[key]));

  return {
    timestamp: new Date().toISOString(),
    browser: navigator.userAgent,
    referrer: document.referrer || 'direct',
    landingPage: window.location.href,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    userAgent: navigator.userAgent,
    utm,
    clickIds,
  };
}
