import { Checkbox } from '@/components/ui/Checkbox';
import { copy } from '@/config/steps';
import type { ApplicationDraft } from '@/types/form';

interface StepBookingIntentProps {
  draft: ApplicationDraft;
  onChange: (partial: ApplicationDraft) => void;
}

export function StepBookingIntent({ draft, onChange }: StepBookingIntentProps) {
  const c = copy.bookingIntent;
  return (
    <div>
      <p className="mb-3 text-[15px] font-medium leading-relaxed text-ink-900">{c.label}</p>
      <Checkbox
        id="bookingIntentConfirmed"
        text={c.checkboxText}
        checked={draft.bookingIntentConfirmed ?? false}
        onChange={(checked) => onChange({ bookingIntentConfirmed: checked })}
      />
    </div>
  );
}
