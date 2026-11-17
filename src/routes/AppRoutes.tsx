import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import ApprovalsPage from '../pages/ApprovalsPage';
import AttendancePage from '../pages/AttendancePage';
import DashboardPage from '../pages/DashboardPage';
import EmployeesPage from '../pages/EmployeesPage';
import EquipmentPage from '../pages/EquipmentPage';
import EquipmentUsagePage from '../pages/EquipmentUsagePage';
import ManagementPage from '../pages/ManagementPage';
import NotFoundPage from '../pages/NotFoundPage';
import UsersPage from '../pages/UsersPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import { paths } from './paths';

/** Definição única de rotas. Páginas de acesso não recebem o layout operacional. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={paths.resetPassword} element={<ResetPasswordPage />} />
      <Route element={<AppLayout />}>
        <Route path={paths.dashboard} element={<DashboardPage />} />
        <Route path={paths.employees} element={<EmployeesPage />} />
        <Route path={paths.equipment} element={<EquipmentPage />} />
        <Route path={paths.attendance} element={<AttendancePage />} />
        <Route path={paths.equipmentUsage} element={<EquipmentUsagePage />} />
        <Route path={paths.users} element={<UsersPage />} />
        <Route path={paths.approvals} element={<ApprovalsPage />} />
        <Route path={paths.management} element={<ManagementPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
