import { ArrowUpRight, LockKeyhole, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import { paths } from '../../routes/paths';
import type { AuthMode } from '../../types/auth';

interface Props {
  mode: Exclude<AuthMode, 'reset'>;
  onRecoveryRequested: () => void;
}

/** Demonstração dos formulários: valida a interface, sem persistir senhas ou autenticar. */
export function AuthForm({ mode, onRecoveryRequested }: Props) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    if (mode === 'register' && data.get('password') !== data.get('confirm')) {
      setError('As senhas devem ser iguais.');
      return;
    }
    if (mode === 'forgot') {
      onRecoveryRequested();
      return;
    }
    navigate(paths.dashboard);
    notify('Bem-vindo ao ambiente de demonstração.');
  };

  return (
    <form className="auth-card" onSubmit={submit}>
      {mode !== 'forgot' && (
        <>
          <button
            type="button"
            className="google-button"
            onClick={() =>
              setError('O login com Google estará disponível após a integração com autenticação.')
            }
          >
            <span className="google-g">G</span>Continuar com Google
          </button>
          <div className="or">
            <span />
            OU
            <span />
          </div>
        </>
      )}
      <label>
        E-mail
        <div className="input-icon">
          <Mail size={16} />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            required
          />
        </div>
      </label>
      {mode !== 'forgot' && (
        <label>
          <span className="label-row">
            Senha{mode === 'login' && <Link to={paths.forgotPassword}>Esqueceu a senha?</Link>}
          </span>
          <div className="input-icon">
            <LockKeyhole size={16} />
            <input
              type="password"
              name="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              placeholder="••••••••"
              required
            />
          </div>
        </label>
      )}
      {mode === 'register' && (
        <label>
          Confirmar senha
          <div className="input-icon">
            <LockKeyhole size={16} />
            <input
              type="password"
              name="confirm"
              autoComplete="new-password"
              minLength={6}
              placeholder="••••••••"
              required
            />
          </div>
        </label>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary auth-submit" type="submit">
        {mode === 'register'
          ? 'Criar conta'
          : mode === 'forgot'
            ? 'Enviar link de recuperação'
            : 'Entrar'}
        <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
