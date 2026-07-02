import { RadioCard } from '@/components/ui/RadioCard';
import { copy } from '@/config/steps';
import type { ApplicationDraft } from '@/types/form';

interface StepConfirmationProps {
  draft: ApplicationDraft;
  onChange: (partial: ApplicationDraft) => void;
}

export function StepConfirmation({ draft, onChange }: StepConfirmationProps) {
  const c = copy.confirmation;
  return (
    <div>
      <p className="mb-3.5 text-[15px] font-medium leading-relaxed text-ink-900">{c.question}</p>
      {c.options.map((option) => (
        <RadioCard
          key={option}
          name="scopeConfirmed"
          value={option}
          label={option}
          checked={draft.scopeConfirmed === option}
          onChange={(value) => onChange({ scopeConfirmed: value as typeof draft.scopeConfirmed })}
        />
      ))}
    </div>
  );
}
