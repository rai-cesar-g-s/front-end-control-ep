/** Catálogo central de URLs. Todas as rotas permanecem públicas nesta etapa. */
export const paths = {
  dashboard: '/',
  attendance: '/presenca',
  equipmentUsage: '/uso-equipamentos',
  employees: '/funcionarios',
  equipment: '/equipamentos',
  approvals: '/aprovacoes',
  management: '/gestao',
  users: '/usuarios',
  login: '/login',
  register: '/cadastro',
  forgotPassword: '/recuperar-senha',
  resetPassword: '/redefinir-senha',
} as const;
