import { CheckCircle2, LogIn, Mail, TriangleAlert, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../../routes/paths';
import type { AuthMode } from '../../types/auth';
import { AuthForm } from './AuthForm';

const content = {
  login: { icon: LogIn, title: 'Bem-vindo de volta', subtitle: 'Acesse sua conta para continuar' },
  register: { icon: UserPlus, title: 'Crie sua conta', subtitle: 'Cadastre-se para começar' },
  forgot: {
    icon: Mail,
    title: 'Recuperar senha',
    subtitle: 'Enviaremos um link para redefinir sua senha',
  },
  reset: {
    icon: TriangleAlert,
    title: 'Link de recuperação inválido',
    subtitle: 'O link está ausente ou é inválido',
  },
};

/** Estrutura visual compartilhada. Cada URL possui seu próprio componente em pages/auth. */
export function AuthScreen({ mode }: { mode: AuthMode }) {
  const [sent, setSent] = useState(false);
  const { icon: Icon, title, subtitle } = content[mode];

  return (
    <div className="auth-page">
      <Link to={paths.dashboard} className="auth-brand">
        Control <b>EP</b>
      </Link>
      <div className="auth-content">
        <div className="auth-icon">
          <Icon size={25} />
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {mode === 'reset' ? (
          <>
            <div className="auth-card">
              <p>
                O link utilizado parece estar incompleto. Solicite um novo e-mail de recuperação de
                senha.
              </p>
            </div>
            <Link className="auth-link" to={paths.forgotPassword}>
              Solicitar novo link
            </Link>
          </>
        ) : sent ? (
          <div className="auth-card success-card">
            <CheckCircle2 size={32} />
            <h2>Solicitação registrada</h2>
            <p>
              Esta é uma demonstração de interface. O envio de e-mail estará disponível após a
              integração com o backend.
            </p>
            <Link to={paths.login}>Voltar ao login</Link>
          </div>
        ) : (
          <>
            <AuthForm mode={mode} onRecoveryRequested={() => setSent(true)} />
            <div className="auth-bottom">
              {mode === 'register' ? (
                <>
                  Já tem uma conta? <Link to={paths.login}>Entrar</Link>
                </>
              ) : mode === 'forgot' ? (
                <Link to={paths.login}>← Voltar ao login</Link>
              ) : (
                <>
                  Ainda não tem uma conta? <Link to={paths.register}>Criar conta</Link>
                </>
              )}
            </div>
          </>
        )}
        <span className="auth-demo">Interface demonstrativa · Sem autenticação real</span>
      </div>
      <div className="auth-footer">
        © {new Date().getFullYear()} Control EP · Gestão com simplicidade.
      </div>
    </div>
  );
}
