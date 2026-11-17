import { useControl } from '../../contexts/ControlContext';
import type { Row } from '../../types/models';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

export function EquipmentHistory({ equipment }: { equipment: Row }) {
  const { usage } = useControl();
  const history = usage.filter(
    (item) => item.equipment === `${equipment.name} · ${equipment.serial}`,
  );
  return (
    <div className="history-list">
      {history.length ? (
        history.map((item) => (
          <div key={item.id}>
            <strong>{item.employee}</strong>
            <p>{new Date(item.start).toLocaleString('pt-BR')}</p>
            <Badge tone={item.end ? 'green' : 'red'}>{item.end ? 'Devolvido' : 'Em uso'}</Badge>
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
