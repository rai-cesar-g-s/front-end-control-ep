import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="empty">
      <Search size={25} />
      <strong>Nenhum registro encontrado</strong>
      <span>Adicione um registro ou ajuste os filtros.</span>
    </div>
  );
}
