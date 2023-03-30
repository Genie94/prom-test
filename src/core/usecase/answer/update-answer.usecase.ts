import { Identifier, Repository, UseCase } from '../../domain';
import { AnswerDomain, AnswerDomainProperty } from '../../domain/answer.domain';

export interface UpdateAnswerCommand {
  identifier: Identifier;
  property: Partial<AnswerDomainProperty>;
}

export class UpdateAnswerUseCase
  implements UseCase<UpdateAnswerCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<AnswerDomain, AnswerDomainProperty>,
  ) {}

  async execute(command: UpdateAnswerCommand): Promise<boolean> {
    const findedAnswer = await this.repo.findOne(command.identifier);
    const findedAnswerProperty = findedAnswer.getProperty();
    const updatedAnswer = this.repo.create({
      identifier: command.identifier,
      ...findedAnswerProperty,
      ...command.property,
    });
    const isSuccess = await this.repo.save(updatedAnswer);
    return isSuccess;
  }
}
