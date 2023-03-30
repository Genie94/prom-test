import { Identifier, Repository, UseCase } from '../../domain';
import { RoleDomain, RoleDomainProperty } from '../../domain/role.domain';

export interface UpdateRoleCommand {
  identifier: Identifier;
  property: Partial<RoleDomainProperty>;
}

export class UpdateRoleUseCase
  implements UseCase<UpdateRoleCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<RoleDomain, RoleDomainProperty>,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<boolean> {
    const findedRole = await this.repo.findOne(command.identifier);
    const findedRoleProperty = findedRole.getProperty();
    const updatedRole = this.repo.create({
      identifier: command.identifier,
      name: command.property.name ?? findedRoleProperty.name,
      permissions:
        command.property.permissions ?? findedRoleProperty.permissions,
      grantedUsers:
        command.property.grantedUsers ?? findedRoleProperty.grantedUsers,
    });
    const isSuccess = await this.repo.save(updatedRole);
    return isSuccess;
  }
}
