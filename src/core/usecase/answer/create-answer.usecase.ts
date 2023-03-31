import { Identifier, Repository, UseCase } from '../../domain';
import { AnswerDomain, AnswerDomainProperty } from '../../domain/answer.domain';

export interface CreateAnswerCommand {
  identifier: Identifier;
  property: AnswerDomainProperty;
}

export class CreateAnswerUseCase
  implements UseCase<CreateAnswerCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<AnswerDomain, AnswerDomainProperty>,
  ) {}

  async execute(command: CreateAnswerCommand): Promise<boolean> {
    const answer = this.repo.create({
      identifier: command.identifier,
      ...command.property,
    });
    const isSuccess = await this.repo.save(answer);
    return isSuccess;
  }
}
