import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Package,
  Palmtree,
  Shield,
  Users,
  UserX,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateRangeFilter } from '../components/forms/DateRangeFilter';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { useControl } from '../contexts/ControlContext';
import { useDateRange } from '../hooks/useDateRange';
import { countAttendance } from '../utils/dates';
/** Página de indicadores da operação. Filtros pertencem apenas a esta tela. */
export default function DashboardPage() {
  const { employees, equipment, usage, attendance } = useControl();
  const [tab, setTab] = useState('Funcionários');
  const { from, setFrom, to, setTo, days } = useDateRange();
  const dates = <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />;
  const count = (value: string) => countAttendance(attendance, value, from, to);
  return (
    <>
      <PageHeader
        title="Painel Geral"
        subtitle="Acompanhe sua equipe e seus equipamentos em um só lugar."
        actions={
          <span className="date-caption">
            {new Date().toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        }
      />
      <div className="toolbar dashboard-toolbar">
        <div className="tabs">
          {['Funcionários', 'Equipamentos'].map((t) => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
              {t === 'Funcionários' ? <Users size={16} /> : <Package size={16} />}
              {t}
            </button>
          ))}
        </div>
        <div className="filters">{dates}</div>
      </div>
      {tab === 'Funcionários' ? (
        <>
          <div className="stats">
            {[
              {
                label: 'Funcionários ativos',
                value: employees.filter((e) => e.status === 'Ativo').length,
                icon: Users,
                tone: 'neutral',
                note: 'Pessoas na equipe',
              },
              {
                label: 'Presenças no período',
                value: count('Presente'),
                icon: CheckCircle2,
                tone: 'green',
                note: 'Comparecimentos registrados',
              },
              {
                label: 'Faltas no período',
                value: count('Falta'),
                icon: UserX,
                tone: 'red',
                note: 'Ausências registradas',
              },
              {
                label: 'Afastados no período',
                value: count('Afastado'),
                icon: BriefcaseBusiness,
                tone: 'neutral',
                note: 'Afastamentos registrados',
              },
              {
                label: 'Férias no período',
                value: count('Férias'),
                icon: Palmtree,
                tone: 'amber',
                note: 'Registros de férias',
              },
            ].map((s) => (
              <div className="stat" key={s.label}>
                <div>
                  <span>{s.label}</span>
                  <span className={`stat-icon ${s.tone}`}>
                    <s.icon size={18} />
                  </span>
                </div>
                <strong>{s.value}</strong>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
          <div className="section-heading">
            <div>
              <h2>Presença por funcionário</h2>
              <p>Visão consolidada do período selecionado</p>
            </div>
            <Link to="/presenca">
              Gerenciar presença <ArrowUpRight size={15} />
            </Link>
          </div>
          <DataTable
            headers={['Funcionário', 'Cargo', 'Presenças', 'Faltas']}
            empty={!employees.length}
          >
            {employees.map((e) => (
              <tr key={e.id}>
                <td>
                  <span className="person-cell">
                    <span className="avatar table-avatar">{e.name.slice(0, 2).toUpperCase()}</span>
                    {e.name}
                  </span>
                </td>
                <td>{e.role}</td>
                <td>
                  <Badge>
                    {days.filter((d) => attendance[e.id + '|' + d] === 'Presente').length}
                  </Badge>
                </td>
                <td>
                  <Badge tone="red">
                    {days.filter((d) => attendance[e.id + '|' + d] === 'Falta').length}
                  </Badge>
                </td>
              </tr>
            ))}
          </DataTable>
        </>
      ) : (
        <>
          <div className="stats three">
            {[
              ['Equipamentos cadastrados', equipment.length],
              ['Em uso', usage.filter((u) => !u.end).length],
              ['Equipamentos ativos', equipment.filter((e) => e.status === 'Ativo').length],
            ].map(([l, v]) => (
              <div className="stat" key={l}>
                <div>
                  {l}
                  <Package size={18} />
                </div>
                <strong>{v}</strong>
                <small>Inventário de equipamentos</small>
              </div>
            ))}
          </div>
          <DataTable headers={['Equipamento', 'Tipo', 'Identificação', 'Status']}>
            {equipment.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.type}</td>
                <td>{e.serial || '—'}</td>
                <td>
                  <Badge tone={e.status === 'Ativo' ? 'green' : 'neutral'}>{e.status}</Badge>
                </td>
              </tr>
            ))}
          </DataTable>
        </>
      )}
      <div className="dashboard-note">
        <Shield size={16} />
        <span>Informações organizadas para uma operação mais eficiente.</span>
        <span>Control EP</span>
      </div>
    </>
  );
}
