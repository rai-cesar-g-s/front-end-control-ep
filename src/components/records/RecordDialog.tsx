import { Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useControl } from '../../contexts/ControlContext';
import { useNotification } from '../../contexts/NotificationContext';
import { parseRecord, upsertRecord } from '../../services/records';
import type { RecordDialogState } from '../../types/models';
import { Modal } from '../ui/Modal';
import { EquipmentHistory } from './EquipmentHistory';
import { RecordFields } from './RecordFields';

const labels = {
  employee: 'funcionário',
  equipment: 'equipamento',
  usage: 'uso de equipamento',
  role: 'papel',
};

export function RecordDialog({
  record,
  onClose,
}: {
  record: NonNullable<RecordDialogState>;
  onClose: () => void;
}) {
  const { setEmployees, setEquipment, setUsage, setRoles } = useControl();
  const { notify } = useNotification();
  const [error, setError] = useState('');
  if (record.kind === 'history')
    return (
      <Modal title="Histórico do equipamento" subtitle={record.row?.name} onClose={onClose}>
        {record.row && <EquipmentHistory equipment={record.row} />}
      </Modal>
    );
  const kind = record.kind;
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const parsed = parseRecord(kind, new FormData(event.currentTarget), record.row);
      switch (parsed.kind) {
        case 'employee':
          setEmployees((rows) => upsertRecord(rows, parsed.value));
          break;
        case 'equipment':
          setEquipment((rows) => upsertRecord(rows, parsed.value));
          break;
        case 'usage':
          setUsage((rows) => upsertRecord(rows, parsed.value));
          break;
        case 'role':
          setRoles((rows) => upsertRecord(rows, parsed.value));
          break;
      }
      onClose();
      notify('Registro salvo com sucesso.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível salvar o registro.');
    }
  };
  return (
    <Modal
      title={`${record.row ? 'Editar' : 'Novo registro de'} ${labels[kind]}`}
      subtitle="Preencha as informações abaixo para continuar."
      onClose={onClose}
    >
      <form onSubmit={save}>
        <div className="form-grid">
          <RecordFields kind={kind} row={record.row} />
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
        </div>
        <div className="modal-footer">
          <button className="secondary" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary" type="submit">
            <Check size={16} />
            Salvar registro
          </button>
        </div>
      </form>
    </Modal>
  );
}
