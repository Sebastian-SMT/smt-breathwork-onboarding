interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type?: 'text' | 'email';
  onChange: (value: string) => void;
}

/** Einzeiliges Eingabefeld im Stripe-artigen Karten-Look. */
export function TextField({ id, label, placeholder, value, type = 'text', onChange }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-control border border-ink-border bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand"
      />
    </div>
  );
}
