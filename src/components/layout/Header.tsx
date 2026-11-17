import { Menu } from 'lucide-react';

export function Header({ onToggleMenu }: { onToggleMenu: () => void }) {
  return (
    <header className="topbar">
      <div>
        <button className="icon-button" onClick={onToggleMenu} aria-label="Alternar menu">
          <Menu size={19} />
        </button>
        <span className="topbar-title">Controle de operações</span>
      </div>
      <div>
        <span className="system-status">
          <span className="live-dot" />
          Sistema ativo
        </span>
        <span className="topbar-divider" />
        <span className="avatar small">RC</span>
      </div>
    </header>
  );
}
