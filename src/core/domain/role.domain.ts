import { Domain } from '.';

export class RoleDomain extends Domain<RoleDomainProperty> {}

export interface RoleDomainProperty {
  name: string;
  permissions: Permission[];
  grantedUsers: Manager[];
}
export interface Permission {
  level: PermissionLevel;
  type: PermissionType;
}
export interface Manager {
  name: string;
  portalId: string;
}
export type PermissionLevel = 'READ' | 'WRITE';
export type PermissionType = 'MASTER' | 'PROM' | 'PRO_SET' | 'HISTORY';
