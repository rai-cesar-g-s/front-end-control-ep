import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dateRange, countAttendance, localDate, toDateTimeInput } from '../src/utils/dates.ts';
import { serializeCsv } from '../src/utils/csv.ts';
import { readStored, writeStored } from '../src/services/storage.ts';

test('intervalo inclui as extremidades, atravessa meses e respeita o limite de colunas', () => {
  assert.deepEqual(dateRange('2026-10-31', '2026-11-02'), [
    '2026-10-31',
    '2026-11-01',
    '2026-11-02',
  ]);
  assert.deepEqual(dateRange('2026-11-02', '2026-11-01'), []);
  assert.deepEqual(dateRange('', '2026-11-02'), []);
  assert.deepEqual(dateRange('2026-02-31', '2026-03-05'), []);
  assert.equal(dateRange('2026-01-01', '2026-12-31').length, 62);
});

test('datas locais não são deslocadas para o dia UTC', () => {
  assert.equal(localDate(new Date(2026, 10, 2, 23, 30)), '2026-11-02');
  assert.equal(toDateTimeInput('2026-11-02T08:15'), '2026-11-02T08:15');
});

test('indicadores contam somente o status e período solicitados', () => {
  const attendance = {
    '1|2026-11-01': 'Presente',
    '1|2026-11-02': 'Falta',
    '2|2026-11-02': 'Presente',
  };
  assert.equal(countAttendance(attendance, 'Presente', '2026-11-02', '2026-11-02'), 1);
});

test('CSV escapa aspas, separadores e linhas internas', () => {
  assert.equal(
    serializeCsv([{ Nome: 'Rai; "EP"\nEquipe' }]),
    '\uFEFF"Nome"\r\n"Rai; ""EP""\nEquipe"',
  );
  assert.equal(serializeCsv([]), '');
});

test('armazenamento preserva dados anteriores e recupera JSON inválido sem travar', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  assert.deepEqual(readStored('ep-employees', []), []);
  writeStored('ep-employees', [{ id: 'existing' }]);
  assert.deepEqual(readStored('ep-employees', []), [{ id: 'existing' }]);
  values.set('ep-employees', '{invalid');
  assert.deepEqual(readStored('ep-employees', []), []);
  delete globalThis.localStorage;
});
