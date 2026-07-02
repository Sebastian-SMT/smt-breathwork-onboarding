import { useEffect, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/layout/Hero';
import { StepCard } from '@/components/onboarding/StepCard';
import { SuccessScreen } from '@/components/onboarding/SuccessScreen';
import { useOnboardingForm } from '@/hooks/useOnboardingForm';
import { useSubmitApplication } from '@/services/api';
import { applicationSchema } from '@/types/form';
import { captureAndPersistTrackingParams, buildSubmissionMetadata } from '@/utils/tracking';

export default function App() {
  // Einzige Instanz des Formular-Zustands für die ganze App – wird an
  // StepCard durchgereicht, damit Submit hier immer den aktuellen Stand sieht.
  const form = useOnboardingForm();
  const { mutate, isPending, isSuccess } = useSubmitApplication();

  useEffect(() => {
    captureAndPersistTrackingParams();
  }, []);

  const handleSubmit = () => {
    const parsed = applicationSchema.safeParse(form.draft);
    if (!parsed.success) {
      // Sollte durch die Schritt-Validierung bereits verhindert sein.
      console.error('Validierung fehlgeschlagen', parsed.error);
      return;
    }

    mutate(
      { data: parsed.data, metadata: buildSubmissionMetadata() },
      { onSuccess: () => form.resetProgress() }
    );
  };

  return (
    <PageShell>
      <Hero />
      {isSuccess ? <SuccessCard /> : <StepCard form={form} onSubmit={handleSubmit} />}
      {isPending && <SubmittingHint />}
    </PageShell>
  );
}

/** Eigene Card für die Erfolgsansicht, damit die Rahmenoptik konsistent bleibt. */
function SuccessCard() {
  return (
    <div className="rounded-card bg-card p-8 shadow-card">
      <SuccessScreen />
    </div>
  );
}

function SubmittingHint() {
  return <p className="mt-3 text-center text-[13px] text-ink-400">Bewerbung wird gesendet …</p>;
}
