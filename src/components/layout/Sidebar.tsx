import { ChevronRight, ClipboardCheck, LogOut, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../config/navigation';
import { paths } from '../../routes/paths';

export function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="sidebar">
      <Link className="brand" to={paths.dashboard}>
        <span className="brand-icon">
          <ClipboardCheck size={22} />
        </span>
        <span>
          Control <b>EP</b>
          <small>Presença & Equipamentos</small>
        </span>
      </Link>
      <button className="close-sidebar icon-button" onClick={onClose} aria-label="Fechar menu">
        <X size={17} />
      </button>
      <div className="nav-label">PRINCIPAL</div>
      <nav aria-label="Navegação principal">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === paths.dashboard}
            onClick={() => {
              if (window.innerWidth < 800) onClose();
            }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            <ChevronRight className="nav-chevron" size={14} />
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="workspace-info">
          <span className="live-dot" />
          Ambiente de demonstração
        </div>
        <div className="profile">
          <div className="avatar">RC</div>
          <div>
            <strong>Rai Cesar</strong>
            <small>Supervisor</small>
          </div>
          <Link to={paths.login} title="Sair">
            <LogOut size={17} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
