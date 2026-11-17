import { Trash2 } from 'lucide-react';
import { useControl } from '../../contexts/ControlContext';
import { useNotification } from '../../contexts/NotificationContext';
import type { DeleteTarget } from '../../types/models';
import { Modal } from '../ui/Modal';

export function DeleteRecordDialog({
  target,
  onClose,
}: {
  target: NonNullable<DeleteTarget>;
  onClose: () => void;
}) {
  const { setEmployees, setEquipment, setUsage, setRoles } = useControl();
  const { notify } = useNotification();
  const remove = () => {
    switch (target.kind) {
      case 'employee':
        setEmployees((rows) => rows.filter((row) => row.id !== target.id));
        break;
      case 'equipment':
        setEquipment((rows) => rows.filter((row) => row.id !== target.id));
        break;
      case 'usage':
        setUsage((rows) => rows.filter((row) => row.id !== target.id));
        break;
      case 'role':
        setRoles((rows) => rows.filter((row) => row.id !== target.id));
        break;
    }
    onClose();
    notify('Registro excluído.');
  };
  return (
    <Modal title="Excluir este registro?" onClose={onClose} className="confirm" alert>
      <span className="delete-symbol">
        <Trash2 size={24} />
      </span>
      <p>Esta ação removerá o registro salvo neste navegador.</p>
      <div className="modal-footer">
        <button className="secondary" onClick={onClose}>
          Cancelar
        </button>
        <button className="primary" onClick={remove}>
          Excluir registro
        </button>
      </div>
    </Modal>
  );
}
