/** Campos serializáveis dos formulários e registros da demonstração local. */
export type Row = Record<string, string>;

export type RecordKind = 'employee' | 'equipment' | 'usage' | 'role';
export type RecordDialogState = { kind: RecordKind | 'history'; row?: Row } | null;
export type DeleteTarget = { kind: RecordKind; id: string } | null;
export type AttendanceMap = Record<string, string>;
export type BadgeTone = 'green' | 'red' | 'amber' | 'neutral';

/** Contrato dos registros atuais. As chaves do armazenamento são preservadas na refatoração. */
export interface Employee extends Row {
  id: string;
  name: string;
  number: string;
  role: string;
  sector: string;
  jms: string;
  status: string;
  shift: string;
}
export interface Equipment extends Row {
  id: string;
  name: string;
  type: string;
  serial: string;
  status: string;
}
export interface EquipmentUsage extends Row {
  id: string;
  equipment: string;
  employee: string;
  start: string;
  end: string;
  note: string;
}
export interface Role extends Row {
  id: string;
  name: string;
  permissions: string;
}
export interface User extends Row {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}
export interface Operation extends Row {
  name: string;
  unit: string;
  email: string;
}
