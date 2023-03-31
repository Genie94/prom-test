import {
  AnswerDomain,
  AnswerDomainProperty,
} from 'src/core/domain/answer.domain';
import { Identifier, Repository, UseCase } from '../../domain';
import {
  QuestionDomain,
  QuestionDomainProperty,
} from '../../domain/question.domain';

export interface CreateQuestionCommand {
  identifier: Identifier;
  property: QuestionDomainProperty;
}

export class CreateQuestionUseCase
  implements UseCase<CreateQuestionCommand, Promise<boolean>>
{
  constructor(
    private readonly questionRepo: Repository<
      QuestionDomain,
      QuestionDomainProperty
    >,
    private readonly answerRepo: Repository<AnswerDomain, AnswerDomainProperty>,
  ) {}

  async execute(command: CreateQuestionCommand): Promise<boolean> {
    let answer: AnswerDomain | null;
    if (!command.property.isSubjective) {
      answer = await this.answerRepo.findOne(command.property.answer);
    }
    if (!answer) {
      return false;
    }
    const question = this.questionRepo.create({
      identifier: command.identifier,
      ...command.property,
      answer: answer.getIdentifier(),
    });
    const isSuccess = await this.questionRepo.save(question);
    return isSuccess;
  }
}
