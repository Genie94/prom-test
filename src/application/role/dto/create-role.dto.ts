import { Manager, Permission } from 'src/core/domain/role.domain';

export class CreateRoleDto {
  name: string;
  permissions: Permission[];
  grantedUsers: Manager[];
}
