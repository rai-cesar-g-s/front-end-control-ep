import { createContext, useContext, useState, type ReactNode } from 'react';
import { DeleteRecordDialog } from '../components/records/DeleteRecordDialog';
import { RecordDialog } from '../components/records/RecordDialog';
import type { DeleteTarget, RecordDialogState, RecordKind, Row } from '../types/models';

interface DialogActions {
  openRecord: (kind: RecordKind | 'history', row?: Row) => void;
  requestDelete: (kind: RecordKind, id: string) => void;
}
const RecordDialogContext = createContext<DialogActions | null>(null);

/** Coordena abertura dos diálogos. Regras de gravação ficam nos componentes de formulário. */
export function RecordDialogProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<RecordDialogState>(null);
  const [target, setTarget] = useState<DeleteTarget>(null);
  return (
    <RecordDialogContext.Provider
      value={{
        openRecord: (kind, row) => setRecord({ kind, row }),
        requestDelete: (kind, id) => setTarget({ kind, id }),
      }}
    >
      {children}
      {record && (
        <RecordDialog
          key={`${record.kind}-${record.row?.id || 'new'}`}
          record={record}
          onClose={() => setRecord(null)}
        />
      )}
      {target && <DeleteRecordDialog target={target} onClose={() => setTarget(null)} />}
    </RecordDialogContext.Provider>
  );
}

export function useRecordDialogs() {
  const context = useContext(RecordDialogContext);
  if (!context) throw new Error('useRecordDialogs deve ser usado dentro de RecordDialogProvider.');
  return context;
}
