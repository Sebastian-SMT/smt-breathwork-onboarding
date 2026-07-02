import { AnimatePresence, motion } from 'framer-motion';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { StepContactInfo } from '@/components/onboarding/steps/StepContactInfo';
import { StepSelfEmployment } from '@/components/onboarding/steps/StepSelfEmployment';
import { StepOpenQuestion } from '@/components/onboarding/steps/StepOpenQuestion';
import { StepConfirmation } from '@/components/onboarding/steps/StepConfirmation';
import { StepBookingIntent } from '@/components/onboarding/steps/StepBookingIntent';
import { copy } from '@/config/steps';
import type { UseOnboardingFormReturn } from '@/hooks/useOnboardingForm';

interface StepCardProps {
  form: UseOnboardingFormReturn;
  onSubmit: () => void;
}

/**
 * Rendert die Card mit Fortschrittsbalken, aktivem Schritt und Navigation.
 * Erhält den Formular-Zustand als Prop statt ihn selbst zu erzeugen, damit
 * App.tsx beim finalen Submit denselben (aktuellen) Zustand sieht.
 */
export function StepCard({ form, onSubmit }: StepCardProps) {
  const { currentStep, currentStepIndex, draft, error, isFirstStep, isLastStep, updateDraft, goNext, goBack } = form;

  const handleNext = () => {
    const finished = goNext();
    if (finished) onSubmit();
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'contact':
        return <StepContactInfo draft={draft} onChange={updateDraft} />;
      case 'selfEmployment':
        return <StepSelfEmployment draft={draft} onChange={updateDraft} />;
      case 'motivation':
        return (
          <StepOpenQuestion
            fieldId="motivation"
            question={copy.motivation.question}
            value={draft.motivation ?? ''}
            onChange={(motivation) => updateDraft({ motivation })}
          />
        );
      case 'targetAudience':
        return (
          <StepOpenQuestion
            fieldId="targetAudience"
            question={copy.targetAudience.question}
            value={draft.targetAudience ?? ''}
            onChange={(targetAudience) => updateDraft({ targetAudience })}
          />
        );
      case 'candidateFit':
        return (
          <StepOpenQuestion
            fieldId="candidateFit"
            question={copy.candidateFit.question}
            value={draft.candidateFit ?? ''}
            onChange={(candidateFit) => updateDraft({ candidateFit })}
          />
        );
      case 'confirmation':
        return <StepConfirmation draft={draft} onChange={updateDraft} />;
      case 'bookingIntent':
        return <StepBookingIntent draft={draft} onChange={updateDraft} />;
    }
  };

  return (
    <div className="rounded-card bg-card p-8 shadow-card">
      <ProgressBar currentStepIndex={currentStepIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="mt-3 rounded-control bg-warn-bg px-3 py-2.5 text-[13px] text-warn-text" role="alert">
          {error}
        </p>
      )}

      <NavigationButtons isFirstStep={isFirstStep} isLastStep={isLastStep} onBack={goBack} onNext={handleNext} />
    </div>
  );
}
