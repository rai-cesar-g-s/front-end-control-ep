import { useNotification } from '../../contexts/NotificationContext';
import { initialOperation } from '../../data/initialData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { storageKeys } from '../../services/storage';
import { FormField } from './FormField';

export function OperationForm() {
  const [config, setConfig] = useLocalStorage(storageKeys.operation, initialOperation);
  const { notify } = useNotification();
  return (
    <form
      className="operation-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setConfig({
          name: String(data.get('name')),
          unit: String(data.get('unit')),
          email: String(data.get('email')),
        });
        notify('Configurações da operação salvas.');
      }}
    >
      <h2>Informações da operação</h2>
      <p>Personalize os dados da sua unidade.</p>
      <FormField name="name" label="Nome da operação" value={config.name} />
      <FormField name="unit" label="Unidade" value={config.unit} />
      <FormField name="email" label="E-mail de contato" type="email" value={config.email} />
      <button className="primary" type="submit">
        Salvar alterações
      </button>
    </form>
  );
}
