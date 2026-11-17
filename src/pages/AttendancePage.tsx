import { ClipboardCheck, Printer } from 'lucide-react';
import { useState } from 'react';
import { DateRangeFilter } from '../components/forms/DateRangeFilter';
import { ExportButton } from '../components/records/RecordActions';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { useControl } from '../contexts/ControlContext';
import { useNotification } from '../contexts/NotificationContext';
import { useDateRange } from '../hooks/useDateRange';
/** Registro de presença por funcionário e data, com filtros próprios desta página. */
export default function AttendancePage() {
  const { employees, attendance, setAttendance } = useControl();
  const { notify } = useNotification();
  const [person, setPerson] = useState('Todos');
  const [status, setStatus] = useState('Ativo');
  const [shift, setShift] = useState('Todos');
  const { from, setFrom, to, setTo, days } = useDateRange();
  const dates = <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />;
  const filteredEmployees = employees.filter(
    (e) =>
      (status === 'Todos' || e.status === status) &&
      (person === 'Todos' || e.name === person) &&
      (shift === 'Todos' || e.shift === shift),
  );
  return (
    <>
      <PageHeader
        title="Lista de Presença"
        subtitle="Organize a disponibilidade e a presença da sua equipe."
        actions={
          <>
            <ExportButton
              rows={employees.map((e) => ({
                Funcionário: e.name,
                ...Object.fromEntries(
                  days.map((d) => [d, attendance[e.id + '|' + d] || 'Não informado']),
                ),
              }))}
              name="presenca"
            />
            <button className="secondary" onClick={() => window.print()}>
              <Printer size={15} />
              Imprimir
            </button>
            <button
              className="primary"
              onClick={() => {
                setAttendance({
                  ...attendance,
                  ...Object.fromEntries(
                    filteredEmployees.flatMap((e) => days.map((d) => [e.id + '|' + d, 'Presente'])),
                  ),
                });
                notify('Presenças registradas para o período.');
              }}
            >
              <ClipboardCheck size={16} />
              Marcar todos presentes
            </button>
          </>
        }
      />
      <div className="filter-card filters">
        {dates}
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Ativo</option>
            <option>Inativo</option>
            <option>Todos</option>
          </select>
        </label>
        <label>
          Turno
          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            {['Todos', 'Manhã', 'Tarde', 'Noite'].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Pessoa
          <select value={person} onChange={(e) => setPerson(e.target.value)}>
            <option>Todos</option>
            {employees.map((e) => (
              <option key={e.id}>{e.name}</option>
            ))}
          </select>
        </label>
      </div>
      <DataTable
        headers={['Funcionário', 'Turno', ...days.map((d) => d.slice(8) + '/' + d.slice(5, 7))]}
        empty={!filteredEmployees.length}
      >
        {filteredEmployees.map((e) => (
          <tr key={e.id}>
            <td className="strong">{e.name}</td>
            <td>{e.shift || '—'}</td>
            {days.map((d) => (
              <td key={d} className="presence-cell">
                <select
                  aria-label={`Presença de ${e.name} em ${d}`}
                  className={attendance[e.id + '|' + d] === 'Presente' ? 'present' : ''}
                  value={attendance[e.id + '|' + d] || ''}
                  onChange={(ev) =>
                    setAttendance({ ...attendance, [e.id + '|' + d]: ev.target.value })
                  }
                >
                  <option value="">Não informado</option>
                  {['Presente', 'Falta', 'Afastado', 'Férias', 'Folga'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            ))}
          </tr>
        ))}
      </DataTable>
      <p className="helper-text">
        As alterações são salvas automaticamente. Exibição limitada a 62 dias por consulta.
      </p>
    </>
  );
}
