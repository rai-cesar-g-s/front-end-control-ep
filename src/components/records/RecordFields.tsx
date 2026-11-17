import { useControl } from '../../contexts/ControlContext';
import type { RecordKind, Row } from '../../types/models';
import { toDateTimeInput } from '../../utils/dates';
import { FormField } from '../forms/FormField';

const permissions = [
  'Presença',
  'Marcar presença',
  'Funcionários',
  'Equipamentos',
  'Uso de Equipamentos',
  'Aprovações',
  'Gestão',
  'Usuários',
];

/** Campos por entidade. Validação e conversão ficam em services/records. */
export function RecordFields({ kind, row }: { kind: RecordKind; row?: Row }) {
  const { employees, equipment } = useControl();
  const field = (
    name: string,
    label: string,
    options?: string[],
    type = 'text',
    required = true,
  ) => (
    <FormField
      key={name}
      name={name}
      label={label}
      options={options}
      type={type}
      value={type === 'datetime-local' ? toDateTimeInput(row?.[name] || '') : row?.[name]}
      required={required}
    />
  );
  switch (kind) {
    case 'employee':
      return (
        <>
          {field('name', 'Nome completo')}
          {field('number', 'Número', undefined, 'text', false)}
          {field('role', 'Cargo')}
          {field('sector', 'Setor')}
          {field('jms', 'Usuário JMS', undefined, 'text', false)}
          {field('shift', 'Turno', ['Manhã', 'Tarde', 'Noite'])}
          {field('status', 'Status', ['Ativo', 'Inativo'])}
        </>
      );
    case 'equipment':
      return (
        <>
          {field('name', 'Nome')}
          {field('type', 'Tipo', ['PDA', 'Notebook', 'Rádio', 'Tablet', 'Celular', 'Outro'])}
          {field('serial', 'Identificação / número de série', undefined, 'text', false)}
          {field('status', 'Status', ['Ativo', 'Inativo', 'Manutenção'])}
        </>
      );
    case 'usage': {
      // Preserva opções históricas mesmo se o cadastro original for renomeado ou excluído.
      const options = (values: string[], current?: string) =>
        Array.from(new Set([...values, ...(current ? [current] : [])]));
      return (
        <>
          {field(
            'equipment',
            'Equipamento',
            options(
              equipment.map((item) => item.name + ' · ' + item.serial),
              row?.equipment,
            ),
          )}
          {field(
            'employee',
            'Funcionário',
            options(
              employees.map((item) => item.name),
              row?.employee,
            ),
          )}
          {field('start', 'Início', undefined, 'datetime-local')}
          {field('end', 'Devolução (opcional)', undefined, 'datetime-local', false)}
          {field('note', 'Observação', undefined, 'text', false)}
        </>
      );
    }
    case 'role': {
      const selected = row?.permissions.split(',').map((value) => value.trim()) || [];
      return (
        <>
          {field('name', 'Nome do papel')}
          <fieldset>
            <legend>Permissões</legend>
            {permissions.map((permission) => (
              <label className="checkbox-label" key={permission}>
                <input
                  type="checkbox"
                  name="permission"
                  value={permission}
                  defaultChecked={selected.includes(permission)}
                />
                {permission}
              </label>
            ))}
          </fieldset>
        </>
      );
    }
  }
}
