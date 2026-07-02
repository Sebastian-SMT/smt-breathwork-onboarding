interface RadioCardProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

/** Einzelne auswählbare Option, optisch als Karte statt klassischem Radio-Button. */
export function RadioCard({ name, value, label, checked, onChange }: RadioCardProps) {
  return (
    <label
      className={`mb-2.5 flex cursor-pointer items-center gap-3 rounded-control border px-3.5 py-3 text-sm text-ink-700 transition-colors ${
        checked ? 'border-brand bg-brand-light' : 'border-ink-border bg-white hover:border-ink-400'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 accent-brand"
      />
      {label}
    </label>
  );
}
