interface NavigationButtonsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
}

/** Reine Weiter/Zurück-Navigation. Kein Submit-Button vor dem letzten Schritt. */
export function NavigationButtons({ isFirstStep, isLastStep, onBack, onNext }: NavigationButtonsProps) {
  return (
    <div className="mt-7 flex gap-3">
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-control border border-ink-border bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-page"
        >
          Zurück
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        className="flex-1 rounded-control bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
      >
        {isLastStep ? 'Bewerbung abschicken' : 'Weiter'}
      </button>
    </div>
  );
}
