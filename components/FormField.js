export function Field({ label, name, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-ink/75">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base font-medium text-ink placeholder:font-normal placeholder:text-ink/40"
      />
    </div>
  );
}

export function Select({ label, name, required, options, defaultValue }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-ink/75">{label}</label>
      <select name={name} required={required} defaultValue={defaultValue} className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base font-medium text-ink">
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function TextArea({ label, name, required, placeholder, rows = 4 }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-ink/75">{label}</label>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base font-medium text-ink placeholder:font-normal placeholder:text-ink/40"
      />
    </div>
  );
}
