import {
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  LayoutDashboard,
  Package,
  Shield,
  UserCog,
  Users,
} from 'lucide-react';
import { paths } from '../routes/paths';

/** Menu e rotas usam os mesmos caminhos para evitar links divergentes. */
export const navigation = [
  { path: paths.dashboard, label: 'Painel', icon: LayoutDashboard },
  { path: paths.attendance, label: 'Presença', icon: ClipboardCheck },
  { path: paths.equipmentUsage, label: 'Uso de Equipamentos', icon: BriefcaseBusiness },
  { path: paths.employees, label: 'Funcionários', icon: Users },
  { path: paths.equipment, label: 'Equipamentos', icon: Package },
  { path: paths.approvals, label: 'Aprovações', icon: BadgeCheck },
  { path: paths.management, label: 'Gestão', icon: Shield },
  { path: paths.users, label: 'Usuários', icon: UserCog },
];
