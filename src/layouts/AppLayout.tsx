import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { RecordDialogProvider } from '../contexts/RecordDialogContext';

/** Estrutura das páginas de operação. Outlet renderiza a rota filha, sem proteção de acesso. */
export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth >= 800);
  return (
    <RecordDialogProvider>
      <div className={`app ${menuOpen ? '' : 'collapsed'}`}>
        <Sidebar onClose={() => setMenuOpen(false)} />
        {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />}
        <div className="main-wrap">
          <Header onToggleMenu={() => setMenuOpen((open) => !open)} />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </RecordDialogProvider>
  );
}
