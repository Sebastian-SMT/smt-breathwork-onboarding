interface CheckboxProps {
  id: string;
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** Pflicht-Checkbox mit langem Bestätigungstext, z. B. Buchungszweck. */
export function Checkbox({ id, text, checked, onChange }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-control border border-ink-border bg-white px-3.5 py-3.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
      />
      <span className="text-[13px] leading-relaxed text-ink-700">{text}</span>
    </label>
  );
}
