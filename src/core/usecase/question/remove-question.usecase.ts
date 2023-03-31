import { Identifier, Repository, UseCase } from '../../domain';
import {
  QuestionDomain,
  QuestionDomainProperty,
} from '../../domain/question.domain';

export interface RemoveQuestionCommand {
  identifier: Identifier;
}
export class RemoveQuestionUseCase
  implements UseCase<RemoveQuestionCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<QuestionDomain, QuestionDomainProperty>,
  ) {}

  async execute(command: RemoveQuestionCommand): Promise<boolean> {
    const isSuccess = await this.repo.delete(command.identifier);
    return isSuccess;
  }
}
