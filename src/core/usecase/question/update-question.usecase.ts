import { Identifier, Repository, UseCase } from '../../domain';
import {
  QuestionDomain,
  QuestionDomainProperty,
} from '../../domain/question.domain';

export interface UpdateQuestionCommand {
  identifier: Identifier;
  property: Partial<QuestionDomainProperty>;
}

export class UpdateQuestionUseCase
  implements UseCase<UpdateQuestionCommand, Promise<boolean>>
{
  constructor(
    private readonly repo: Repository<QuestionDomain, QuestionDomainProperty>,
  ) {}

  async execute(command: UpdateQuestionCommand): Promise<boolean> {
    const findedQuestion = await this.repo.findOne(command.identifier);
    if (!findedQuestion) {
      return false;
    }
    const findedQuestionProperty = findedQuestion.getProperty();
    const updatedQuestion = this.repo.create({
      identifier: command.identifier,
      ...findedQuestionProperty,
      ...command.property,
    });
    const isSuccess = await this.repo.save(updatedQuestion);
    return isSuccess;
  }
}
