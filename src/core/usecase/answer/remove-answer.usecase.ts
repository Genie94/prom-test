import { Identifier, Repository, UseCase } from '../../domain';
import { AnswerDomain, AnswerDomainProperty } from '../../domain/answer.domain';

export interface RemoveAnswerCommand {
  identifier: Identifier;
}
export class RemoveAnswerUseCase
  implements UseCase<RemoveAnswerCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<AnswerDomain, AnswerDomainProperty>,
  ) {}

  async execute(command: RemoveAnswerCommand): Promise<boolean> {
    const isSuccess = await this.repo.delete(command.identifier);
    return isSuccess;
  }
}
