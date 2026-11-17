interface Props {
  name: string;
  label: string;
  value?: string;
  options?: string[];
  type?: string;
  required?: boolean;
}

/** Campo não controlado lido via FormData no envio do formulário. */
export function FormField({
  name,
  label,
  value = '',
  options,
  type = 'text',
  required = true,
}: Props) {
  return (
    <label>
      {label}
      {options ? (
        <select name={name} defaultValue={value || options[0] || ''} required={required}>
          {!options.length && <option value="">Nenhum registro disponível</option>}
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} defaultValue={value} required={required} />
      )}
    </label>
  );
}
