import { useMemo, useState } from 'react';
import { dateRange, localDate } from '../utils/dates';

/** Cada página mantém seu próprio intervalo; navegar não transporta filtros entre telas. */
export function useDateRange() {
  const [from, setFrom] = useState(localDate);
  const [to, setTo] = useState(localDate);
  const days = useMemo(() => dateRange(from, to), [from, to]);
  return { from, setFrom, to, setTo, days };
}
