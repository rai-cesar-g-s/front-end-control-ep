import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import {
  initialEmployees,
  initialEquipment,
  initialRoles,
  initialUsage,
  initialUsers,
} from '../data/initialData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { storageKeys } from '../services/storage';
import type {
  AttendanceMap,
  Employee,
  Equipment,
  EquipmentUsage,
  Role,
  User,
} from '../types/models';

type Setter<T> = Dispatch<SetStateAction<T>>;
interface ControlState {
  employees: Employee[];
  setEmployees: Setter<Employee[]>;
  equipment: Equipment[];
  setEquipment: Setter<Equipment[]>;
  usage: EquipmentUsage[];
  setUsage: Setter<EquipmentUsage[]>;
  roles: Role[];
  setRoles: Setter<Role[]>;
  users: User[];
  setUsers: Setter<User[]>;
  attendance: AttendanceMap;
  setAttendance: Setter<AttendanceMap>;
}
const ControlContext = createContext<ControlState | null>(null);

/** Dados compartilhados entre páginas. Filtros e formulários ficam fora deste contexto.
 * A persistência é local nesta etapa; uma futura API pode substituir os hooks aqui.
 */
export function ControlProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useLocalStorage(storageKeys.employees, initialEmployees);
  const [equipment, setEquipment] = useLocalStorage(storageKeys.equipment, initialEquipment);
  const [usage, setUsage] = useLocalStorage(storageKeys.usage, initialUsage);
  const [roles, setRoles] = useLocalStorage(storageKeys.roles, initialRoles);
  const [users, setUsers] = useLocalStorage(storageKeys.users, initialUsers);
  const [attendance, setAttendance] = useLocalStorage<AttendanceMap>(storageKeys.attendance, {});
  return (
    <ControlContext.Provider
      value={{
        employees,
        setEmployees,
        equipment,
        setEquipment,
        usage,
        setUsage,
        roles,
        setRoles,
        users,
        setUsers,
        attendance,
        setAttendance,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

export function useControl() {
  const context = useContext(ControlContext);
  if (!context) throw new Error('useControl deve ser usado dentro de ControlProvider.');
  return context;
}
