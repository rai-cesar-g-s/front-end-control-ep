import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { useControl } from '../contexts/ControlContext';
import { useNotification } from '../contexts/NotificationContext';
/** Usuários e atribuição de papéis; não implementa autorização no servidor. */
export default function UsersPage() {
  const { roles, users, setUsers } = useControl();
  const { notify } = useNotification();
  return (
    <>
      <PageHeader title="Usuários" subtitle="Aprove cadastros e atribua papéis de acesso." />
      <DataTable headers={['Usuário', 'Papel', 'Status']}>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <div className="user-cell">
                <strong>{u.name}</strong>
                <small>{u.email}</small>
              </div>
            </td>
            <td>
              {u.role.startsWith('Master') ? (
                <span>{u.role}</span>
              ) : (
                <select
                  aria-label={`Papel de ${u.name}`}
                  value={u.role}
                  onChange={(e) => {
                    setUsers(
                      users.map((r) => (r.id === u.id ? { ...r, role: e.target.value } : r)),
                    );
                    notify('Papel atualizado.');
                  }}
                >
                  {Array.from(new Set([u.role, ...roles.map((r) => r.name), 'Operador'])).map(
                    (r) => (
                      <option key={r}>{r}</option>
                    ),
                  )}
                </select>
              )}
            </td>
            <td>
              <Badge
                tone={
                  u.status === 'Pendente'
                    ? 'amber'
                    : u.role.startsWith('Master')
                      ? 'amber'
                      : 'green'
                }
              >
                {u.status}
              </Badge>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
