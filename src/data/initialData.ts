import type { Employee, Equipment, EquipmentUsage, Operation, Role, User } from '../types/models';
import { localDate } from '../utils/dates';

/** Exemplos usados somente quando a respectiva coleção ainda não existe no navegador. */
export const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Func3',
    number: '001',
    role: 'Supervisão',
    sector: 'Operações',
    jms: '—',
    status: 'Ativo',
    shift: 'Manhã',
  },
  {
    id: '2',
    name: 'funcionário2',
    number: '002',
    role: 'Analista',
    sector: 'Operações',
    jms: '—',
    status: 'Ativo',
    shift: 'Tarde',
  },
  {
    id: '3',
    name: 'rai',
    number: '003',
    role: 'Analista',
    sector: 'Administrativo',
    jms: '—',
    status: 'Ativo',
    shift: 'Manhã',
  },
];
export const initialEquipment: Equipment[] = [
  { id: '1', name: 'PDA', type: 'PDA', serial: '00097879', status: 'Ativo' },
];
export const initialUsage: EquipmentUsage[] = [
  {
    id: '1',
    equipment: 'PDA · 00097879',
    employee: 'Func3',
    start: `${localDate()}T08:00`,
    end: '',
    note: '',
  },
];
export const initialRoles: Role[] = [
  { id: '1', name: 'Líder', permissions: 'Presença, Marcar presença, Funcionários, Equipamentos' },
];
export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Antonio de Azevedo Cabreira',
    email: 'antonio.cabreira@email.com',
    role: 'Líder',
    status: 'Aprovado',
  },
  {
    id: '2',
    name: 'Rai Cesar',
    email: 'rai.cesar@email.com',
    role: 'Master (Supervisor)',
    status: 'Aprovado',
  },
  {
    id: '3',
    name: 'jailsson ribeiro',
    email: 'jailsson.ribeiro@email.com',
    role: 'Líder',
    status: 'Pendente',
  },
  {
    id: '4',
    name: 'Marcos Alves',
    email: 'marcos.alves@email.com',
    role: 'Master (Supervisor)',
    status: 'Aprovado',
  },
];
export const initialOperation: Operation = {
  name: 'Control EP',
  unit: 'Unidade principal',
  email: 'operacao@controlep.com.br',
};
