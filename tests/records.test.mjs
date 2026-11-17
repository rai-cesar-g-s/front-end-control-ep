import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRecord, upsertRecord } from '../src/services/records.ts';

const form = (fields) => {
  const data = new FormData();
  for (const [key, value] of fields) data.append(key, value);
  return data;
};

test('papéis preservam todas as permissões e o identificador na edição', () => {
  const result = parseRecord(
    'role',
    form([
      ['name', ' Liderança '],
      ['permission', 'Presença'],
      ['permission', 'Equipamentos'],
    ]),
    { id: 'original' },
  );
  assert.deepEqual(result, {
    kind: 'role',
    value: { id: 'original', name: 'Liderança', permissions: 'Presença, Equipamentos' },
  });
});

test('empréstimo recusa devolução anterior ao início', () => {
  assert.throws(
    () =>
      parseRecord(
        'usage',
        form([
          ['equipment', 'PDA'],
          ['employee', 'Rai'],
          ['start', '2026-11-02T10:00'],
          ['end', '2026-11-02T09:00'],
        ]),
      ),
    /devolução deve ser posterior/,
  );
});

test('cadastro recusa nome vazio mesmo quando o formulário é enviado programaticamente', () => {
  assert.throws(() => parseRecord('equipment', form([['name', '  ']])), /campo nome/);
});

test('atualização preserva os demais registros e não duplica o editado', () => {
  const original = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
  ];
  assert.deepEqual(upsertRecord(original, { id: '1', name: 'Editado' }), [
    { id: '1', name: 'Editado' },
    original[1],
  ]);
  assert.equal(original[0].name, 'A');
  assert.equal(upsertRecord(original, { id: '3', name: 'Novo' }).length, 3);
});
