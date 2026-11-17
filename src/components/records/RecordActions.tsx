import { Download, History, Pencil, Plus, Trash2 } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useRecordDialogs } from '../../contexts/RecordDialogContext';
import type { RecordKind, Row } from '../../types/models';
import { exportCsv } from '../../utils/csv';

export function CreateButton({ kind, label }: { kind: RecordKind; label: string }) {
  const { openRecord } = useRecordDialogs();
  return (
    <button className="primary" onClick={() => openRecord(kind)}>
      <Plus size={16} />
      {label}
    </button>
  );
}

export function ExportButton({ rows, name }: { rows: Row[]; name: string }) {
  const { notify } = useNotification();
  return (
    <button
      className="secondary"
      onClick={() => {
        exportCsv(name, rows);
        notify(rows.length ? 'Arquivo exportado.' : 'Não há registros para exportar.');
      }}
    >
      <Download size={15} />
      Exportar
    </button>
  );
}

export function RowActions({ kind, row }: { kind: RecordKind; row: Row }) {
  const { openRecord, requestDelete } = useRecordDialogs();
  return (
    <div className="row-actions">
      {kind === 'equipment' && (
        <button
          title="Ver histórico"
          aria-label={`Histórico de ${row.name}`}
          onClick={() => openRecord('history', row)}
        >
          <History size={15} />
        </button>
      )}
      <button
        title="Editar"
        aria-label={`Editar ${row.name || row.equipment}`}
        onClick={() => openRecord(kind, row)}
      >
        <Pencil size={15} />
      </button>
      <button
        className="danger-icon"
        title="Excluir"
        aria-label={`Excluir ${row.name || row.equipment}`}
        onClick={() => requestDelete(kind, row.id)}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
