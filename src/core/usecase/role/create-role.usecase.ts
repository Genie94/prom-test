import { Identifier, Repository, UseCase } from '../../domain';
import { RoleDomain, RoleDomainProperty } from '../../domain/role.domain';

export interface CreateRoleCommand {
  identifier: Identifier;
  property: Partial<RoleDomainProperty>;
}

export class CreateRoleUseCase
  implements UseCase<CreateRoleCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<RoleDomain, RoleDomainProperty>,
  ) {}

  async execute(command: CreateRoleCommand): Promise<boolean> {
    const role = this.repo.create({
      identifier: command.identifier,
      name: command.property.name,
    });
    const isSuccess = await this.repo.save(role);
    return isSuccess;
  }
}
