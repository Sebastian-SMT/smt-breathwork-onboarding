import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { steps, copy } from '@/config/steps';
import { STORAGE_KEY, TOTAL_STEPS } from '@/config/constants';
import type { ApplicationDraft } from '@/types/form';

interface PersistedState {
  currentStepIndex: number;
  draft: ApplicationDraft;
}

const initialState: PersistedState = { currentStepIndex: 0, draft: {} };

/**
 * Kapselt den kompletten Client-Zustand des Onboardings: aktueller Schritt,
 * Antworten-Entwurf, Validierung pro Schritt und Persistenz in localStorage.
 * Komponenten greifen nur über dieses Hook-Interface auf den Zustand zu.
 */
export type UseOnboardingFormReturn = ReturnType<typeof useOnboardingForm>;

export function useOnboardingForm() {
  const { value: state, setValue: setState, clear } = useLocalStorage<PersistedState>(
    STORAGE_KEY,
    initialState
  );
  const [error, setError] = useState<string | null>(null);

  const currentStep = steps[state.currentStepIndex];
  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === TOTAL_STEPS - 1;

  const updateDraft = (partial: ApplicationDraft) => {
    setState((prev) => ({ ...prev, draft: { ...prev.draft, ...partial } }));
    setError(null);
  };

  const validateCurrentStep = (): boolean => {
    const d = state.draft;
    switch (currentStep.id) {
      case 'contact':
        if (!d.email || !d.email.includes('@')) {
          setError('Bitte gib eine gültige E-Mail-Adresse ein.');
          return false;
        }
        if (!d.name || d.name.trim().length < 2) {
          setError('Bitte gib deinen vollständigen Namen ein.');
          return false;
        }
        return true;
      case 'selfEmployment':
        if (!d.selfEmploymentStatus) {
          setError('Bitte wähle eine Option aus.');
          return false;
        }
        return true;
      case 'motivation':
        if (!d.motivation || d.motivation.trim().length < 10) {
          setError('Bitte beschreibe kurz deine Motivation.');
          return false;
        }
        return true;
      case 'targetAudience':
        if (!d.targetAudience || d.targetAudience.trim().length < 10) {
          setError('Bitte beschreibe kurz deine Zielgruppe.');
          return false;
        }
        return true;
      case 'candidateFit':
        if (!d.candidateFit || d.candidateFit.trim().length < 10) {
          setError('Bitte beschreibe kurz deine Eignung.');
          return false;
        }
        return true;
      case 'confirmation':
        if (d.scopeConfirmed === copy.confirmation.blockingValue) {
          setError(copy.confirmation.blockedMessage);
          return false;
        }
        if (d.scopeConfirmed !== 'ja') {
          setError('Bitte wähle eine Option aus.');
          return false;
        }
        return true;
      case 'bookingIntent':
        if (!d.bookingIntentConfirmed) {
          setError('Bitte bestätige diese Angabe, um fortzufahren.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const goNext = (): boolean => {
    if (!validateCurrentStep()) return false;
    if (isLastStep) return true;
    setState((prev) => ({ ...prev, currentStepIndex: prev.currentStepIndex + 1 }));
    return false;
  };

  const goBack = () => {
    if (isFirstStep) return;
    setError(null);
    setState((prev) => ({ ...prev, currentStepIndex: prev.currentStepIndex - 1 }));
  };

  const hasResumableProgress = useMemo(
    () => state.currentStepIndex > 0 || Object.keys(state.draft).length > 0,
    [state]
  );

  return {
    currentStep,
    currentStepIndex: state.currentStepIndex,
    draft: state.draft,
    error,
    isFirstStep,
    isLastStep,
    hasResumableProgress,
    updateDraft,
    goNext,
    goBack,
    resetProgress: clear,
  };
}
