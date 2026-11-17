import type { ReactNode } from 'react';
import type { BadgeTone } from '../../types/models';

export function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
