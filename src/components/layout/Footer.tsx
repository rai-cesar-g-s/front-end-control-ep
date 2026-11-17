import { env } from '../../config/env';

export function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} {env.appName}
      <span>Presença e equipamentos, sob controle.</span>
    </footer>
  );
}
