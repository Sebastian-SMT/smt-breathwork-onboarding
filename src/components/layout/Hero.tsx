import { HERO_CONTENT } from '@/config/constants';

/**
 * Ruhiger Hero-Bereich über der Formular-Card. Bewusst textbasiert und
 * zurückhaltend animiert – die Card ist der eigentliche Star der Seite.
 */
export function Hero() {
  return (
    <div className="mx-auto mb-8 max-w-[480px] text-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-brand">
        {HERO_CONTENT.eyebrow}
      </p>
      <h1 className="mb-2.5 text-2xl font-medium text-ink-900">{HERO_CONTENT.title}</h1>
      <p className="text-[15px] leading-relaxed text-ink-500">{HERO_CONTENT.subtitle}</p>
    </div>
  );
}
