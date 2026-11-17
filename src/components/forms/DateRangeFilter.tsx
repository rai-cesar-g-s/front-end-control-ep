interface Props {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function DateRangeFilter({ from, to, onFromChange, onToChange }: Props) {
  return (
    <>
      <label>
        Data início
        <input
          type="date"
          value={from}
          max={to}
          onChange={(event) => onFromChange(event.target.value)}
        />
      </label>
      <label>
        Data fim
        <input
          type="date"
          value={to}
          min={from}
          onChange={(event) => onToChange(event.target.value)}
        />
      </label>
    </>
  );
}
