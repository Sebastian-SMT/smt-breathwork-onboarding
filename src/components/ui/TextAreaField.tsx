interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/** Mehrzeiliges Eingabefeld für die offenen Motivations-/Eignungsfragen. */
export function TextAreaField({ id, label, value, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-[15px] font-medium leading-relaxed text-ink-900">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        placeholder="Deine Antwort"
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-control border border-ink-border bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand"
      />
    </div>
  );
}
