import { Check } from 'lucide-react';
import { useState } from 'react';
import { CreateButton, ExportButton, RowActions } from '../components/records/RecordActions';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { useControl } from '../contexts/ControlContext';
import { useNotification } from '../contexts/NotificationContext';
import { useDateRange } from '../hooks/useDateRange';
/** Empréstimos e devoluções com filtros de período, equipamento e funcionário. */
export default function EquipmentUsagePage() {
  const { employees, equipment, usage, setUsage } = useControl();
  const { notify } = useNotification();
  const [filter, setFilter] = useState('Todos');
  const [person, setPerson] = useState('Todos');
  const { from, setFrom, to, setTo } = useDateRange();
  return (
    <>
      <PageHeader
        title="Uso de Equipamentos"
        subtitle="Registre quem usa cada equipamento e em qual período."
        actions={
          <>
            <ExportButton rows={usage} name="uso-equipamentos" />
            <CreateButton kind="usage" label="Registrar uso" />
          </>
        }
      />
      <div className="filter-card filters">
        <label>
          Período início
          <input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          Período fim
          <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label>
          Equipamento
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Todos</option>
            {equipment.map((e) => (
              <option key={e.id}>{e.name + ' · ' + e.serial}</option>
            ))}
          </select>
        </label>
        <label>
          Funcionário
          <select value={person} onChange={(e) => setPerson(e.target.value)}>
            <option>Todos</option>
            {employees.map((e) => (
              <option key={e.id}>{e.name}</option>
            ))}
          </select>
        </label>
      </div>
      {(() => {
        const rows = usage.filter(
          (u) =>
            (filter === 'Todos' || u.equipment === filter) &&
            (person === 'Todos' || u.employee === person) &&
            u.start.slice(0, 10) >= from &&
            u.start.slice(0, 10) <= to,
        );
        return (
          <DataTable
            headers={['Equipamento', 'Funcionário', 'Início', 'Devolução', 'Observação', '']}
            empty={!rows.length}
          >
            {rows.map((u) => (
              <tr key={u.id}>
                <td className="strong">{u.equipment}</td>
                <td>{u.employee}</td>
                <td>
                  {new Date(u.start).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </td>
                <td>
                  {u.end ? (
                    new Date(u.end).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  ) : (
                    <button
                      className="badge red badge-button"
                      title="Registrar devolução agora"
                      onClick={() => {
                        setUsage(
                          usage.map((r) =>
                            r.id === u.id ? { ...r, end: new Date().toISOString() } : r,
                          ),
                        );
                        notify('Devolução registrada.');
                      }}
                    >
                      Em uso <Check size={12} />
                    </button>
                  )}
                </td>
                <td>{u.note || '—'}</td>
                <td>
                  <RowActions kind="usage" row={u} />
                </td>
              </tr>
            ))}
          </DataTable>
        );
      })()}
    </>
  );
}
