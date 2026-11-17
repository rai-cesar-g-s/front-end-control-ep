import { useEffect, useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { readStored, writeStored } from '../services/storage';

/** Estado React persistente. Aceita atualização funcional e preserva as chaves antigas. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initial));
  const { notify } = useNotification();
  // Persistência acontece no efeito, evitando efeitos colaterais dentro do atualizador React.
  useEffect(() => {
    try {
      writeStored(key, value);
    } catch {
      notify('Armazenamento indisponível. As alterações ficarão apenas nesta sessão.');
    }
  }, [key, value, notify]);
  return [value, setValue] as const;
}
