/** Acesso central ao armazenamento. Não use para tokens, senhas ou dados sensíveis. */
export const storageKeys = {
  employees: 'ep-employees',
  equipment: 'ep-equipment',
  usage: 'ep-usage',
  roles: 'ep-roles',
  users: 'ep-users',
  attendance: 'ep-attendance',
  operation: 'ep-operation',
} as const;

export function readStored<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    // JSON inválido ou armazenamento indisponível não deve impedir a renderização.
    return fallback;
  }
}

/** Propaga falhas de gravação para que o hook possa informar que o dado não foi persistido. */
export function writeStored<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
