import { Link } from 'react-router-dom';
import { paths } from '../routes/paths';
export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>Página não encontrada</h1>
      <Link className="primary" to={paths.dashboard}>
        Voltar ao painel
      </Link>
    </div>
  );
}
