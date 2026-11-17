import { Check } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { useControl } from '../contexts/ControlContext';
import { useNotification } from '../contexts/NotificationContext';
/** Solicitações pendentes de acesso. As decisões ainda são persistidas apenas localmente. */
export default function ApprovalsPage() {
  const { users, setUsers } = useControl();
  const { notify } = useNotification();
  return (
    <>
      <PageHeader title="Aprovações" subtitle="Revise as solicitações de acesso à plataforma." />
      <DataTable
        headers={['Solicitante', 'Papel solicitado', 'Status', 'Ações']}
        empty={!users.some((u) => u.status === 'Pendente')}
      >
        {users
          .filter((u) => u.status === 'Pendente')
          .map((u) => (
            <tr key={u.id}>
              <td>
                <div className="user-cell">
                  <strong>{u.name}</strong>
                  <small>{u.email}</small>
                </div>
              </td>
              <td>{u.role}</td>
              <td>
                <Badge tone="amber">Pendente</Badge>
              </td>
              <td>
                <div className="row-actions">
                  <button
                    className="secondary"
                    onClick={() => {
                      setUsers(
                        users.map((r) => (r.id === u.id ? { ...r, status: 'Recusado' } : r)),
                      );
                      notify('Solicitação recusada.');
                    }}
                  >
                    Recusar
                  </button>
                  <button
                    className="primary"
                    onClick={() => {
                      setUsers(
                        users.map((r) => (r.id === u.id ? { ...r, status: 'Aprovado' } : r)),
                      );
                      notify('Usuário aprovado.');
                    }}
                  >
                    <Check size={15} />
                    Aprovar
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </DataTable>
    </>
  );
}
