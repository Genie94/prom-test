import { Identifier, Repository, UseCase } from '../../domain';
import { RoleDomain, RoleDomainProperty } from '../../domain/role.domain';

export interface RemoveRoleCommand {
  identifier: Identifier;
}
export class RemoveRoleUseCase
  implements UseCase<RemoveRoleCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<RoleDomain, RoleDomainProperty>,
  ) {}

  async execute(command: RemoveRoleCommand): Promise<boolean> {
    const isSuccess = await this.repo.delete(command.identifier);
    return isSuccess;
  }
}
