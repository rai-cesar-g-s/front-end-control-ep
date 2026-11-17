/** Data civil local no formato esperado por input[type=date], sem conversão para UTC. */
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** Intervalo inclusivo limitado para não criar tabelas com centenas de colunas. */
export function dateRange(from: string, to: string, limit = 62): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) return [];
  const date = new Date(`${from}T12:00:00`);
  const endDate = new Date(`${to}T12:00:00`);
  const days: string[] = [];
  if (
    Number.isNaN(date.getTime()) ||
    Number.isNaN(endDate.getTime()) ||
    localDate(date) !== from ||
    localDate(endDate) !== to
  )
    return days;
  while (localDate(date) <= to && days.length < limit) {
    days.push(localDate(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/** A chave de presença tem o formato employeeId|YYYY-MM-DD. */
export function countAttendance(
  attendance: Record<string, string>,
  value: string,
  from: string,
  to: string,
): number {
  return Object.entries(attendance).filter(([key, status]) => {
    const day = key.split('|')[1];
    return status === value && day >= from && day <= to;
  }).length;
}

/** Converte datas persistidas, inclusive ISO/UTC, para datetime-local. */
export function toDateTimeInput(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return `${localDate(date)}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
