import type { Employee, Equipment, EquipmentUsage, RecordKind, Role, Row } from '../types/models';

type ParsedRecord =
  | { kind: 'employee'; value: Employee }
  | { kind: 'equipment'; value: Equipment }
  | { kind: 'usage'; value: EquipmentUsage }
  | { kind: 'role'; value: Role };

/** Converte FormData em entidades tipadas sem persistir nem manipular a interface. */
export function parseRecord(kind: RecordKind, data: FormData, previous?: Row): ParsedRecord {
  const read = (key: string) => String(data.get(key) ?? '').trim();
  const required = (key: string, label: string) => {
    const value = read(key);
    if (!value) throw new Error(`Preencha o campo ${label}.`);
    return value;
  };
  const id = previous?.id || crypto.randomUUID();
  switch (kind) {
    case 'employee':
      return {
        kind,
        value: {
          id,
          name: required('name', 'nome'),
          number: read('number'),
          role: required('role', 'cargo'),
          sector: required('sector', 'setor'),
          jms: read('jms'),
          shift: required('shift', 'turno'),
          status: required('status', 'status'),
        },
      };
    case 'equipment':
      return {
        kind,
        value: {
          id,
          name: required('name', 'nome'),
          type: required('type', 'tipo'),
          serial: read('serial'),
          status: required('status', 'status'),
        },
      };
    case 'usage': {
      const start = required('start', 'início');
      const end = read('end');
      if (Number.isNaN(new Date(start).getTime()) || (end && Number.isNaN(new Date(end).getTime())))
        throw new Error('Informe datas válidas para o empréstimo.');
      if (end && new Date(end) < new Date(start))
        throw new Error('A devolução deve ser posterior ao início.');
      return {
        kind,
        value: {
          id,
          equipment: required('equipment', 'equipamento'),
          employee: required('employee', 'funcionário'),
          start,
          end,
          note: read('note'),
        },
      };
    }
    case 'role':
      return {
        kind,
        value: {
          id,
          name: required('name', 'nome do papel'),
          permissions: data.getAll('permission').map(String).join(', '),
        },
      };
  }
}

/** Atualiza pelo identificador, preservando a posição; novos registros são adicionados ao fim. */
export function upsertRecord<T extends { id: string }>(rows: T[], record: T): T[] {
  return rows.some((row) => row.id === record.id)
    ? rows.map((row) => (row.id === record.id ? record : row))
    : [...rows, record];
}
