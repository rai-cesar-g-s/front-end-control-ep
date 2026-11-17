import type { Row } from '../types/models';

/** BOM e separador ; favorecem a abertura no Excel em português. */
export function serializeCsv(rows: Row[]): string {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  return (
    '\uFEFF' +
    [keys, ...rows.map((row) => keys.map((key) => row[key] ?? ''))]
      .map((row) => row.map((value) => '"' + String(value).replaceAll('"', '""') + '"').join(';'))
      .join('\r\n')
  );
}

export function exportCsv(name: string, rows: Row[]): void {
  if (!rows.length) return;
  const url = URL.createObjectURL(
    new Blob([serializeCsv(rows)], { type: 'text/csv;charset=utf-8;' }),
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${name}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
