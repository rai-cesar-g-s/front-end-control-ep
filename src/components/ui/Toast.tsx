import { CheckCircle2, X } from 'lucide-react';

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div role="status" className="toast">
      <CheckCircle2 size={19} />
      {message}
      <button onClick={onDismiss} aria-label="Fechar aviso">
        <X size={15} />
      </button>
    </div>
  );
}
