import { ControlProvider } from './contexts/ControlContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AppRoutes } from './routes/AppRoutes';

/** Raiz da aplicação: infraestrutura compartilhada e navegação. */
export default function App() {
  return (
    <NotificationProvider>
      <ControlProvider>
        <AppRoutes />
      </ControlProvider>
    </NotificationProvider>
  );
}
