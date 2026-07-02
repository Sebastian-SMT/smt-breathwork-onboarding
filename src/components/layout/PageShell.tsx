import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
}

/** Äußerer Seiten-Rahmen: Hintergrundfarbe, Zentrierung, responsives Padding. */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-page px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[480px]">{children}</div>
    </div>
  );
}
