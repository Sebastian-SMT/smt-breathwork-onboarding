import { RadioCard } from '@/components/ui/RadioCard';
import { copy } from '@/config/steps';
import type { ApplicationDraft } from '@/types/form';

interface StepSelfEmploymentProps {
  draft: ApplicationDraft;
  onChange: (partial: ApplicationDraft) => void;
}

export function StepSelfEmployment({ draft, onChange }: StepSelfEmploymentProps) {
  const c = copy.selfEmployment;
  return (
    <div>
      <p className="mb-3.5 text-[15px] font-medium leading-relaxed text-ink-900">{c.question}</p>
      {c.options.map((option) => (
        <RadioCard
          key={option}
          name="selfEmploymentStatus"
          value={option}
          label={option}
          checked={draft.selfEmploymentStatus === option}
          onChange={(value) => onChange({ selfEmploymentStatus: value as typeof draft.selfEmploymentStatus })}
        />
      ))}
    </div>
  );
}
