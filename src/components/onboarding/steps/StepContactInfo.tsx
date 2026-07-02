import { TextField } from '@/components/ui/TextField';
import { copy } from '@/config/steps';
import type { ApplicationDraft } from '@/types/form';

interface StepContactInfoProps {
  draft: ApplicationDraft;
  onChange: (partial: ApplicationDraft) => void;
}

export function StepContactInfo({ draft, onChange }: StepContactInfoProps) {
  const c = copy.contact;
  return (
    <div>
      <TextField
        id="email"
        type="email"
        label={c.emailLabel}
        placeholder={c.emailPlaceholder}
        value={draft.email ?? ''}
        onChange={(email) => onChange({ email })}
      />
      <TextField
        id="name"
        label={c.nameLabel}
        placeholder={c.namePlaceholder}
        value={draft.name ?? ''}
        onChange={(name) => onChange({ name })}
      />
    </div>
  );
}
