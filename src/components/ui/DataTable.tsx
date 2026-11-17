import type { ReactNode } from 'react';
import { EmptyState } from './EmptyState';

/** Contêiner de tabela com rolagem horizontal e estado vazio padronizado. */
export function DataTable({
  headers,
  children,
  empty = false,
}: {
  headers: string[];
  children: ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="table-card">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {empty && <EmptyState />}
    </div>
  );
}
