import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Toast } from '../components/ui/Toast';

const NotificationContext = createContext<{ notify: (message: string) => void } | null>(null);

/** Um único canal de feedback, disponível também nas páginas públicas. */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setMessage('');
  }, []);
  const notify = useCallback((text: string) => {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(''), 4000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {message && <Toast message={message} onDismiss={dismiss} />}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification deve ser usado dentro de NotificationProvider.');
  return context;
}
