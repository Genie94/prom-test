import { Injectable } from '@nestjs/common';
import { CreateQuestionUseCase } from 'src/core/usecase/question/create-question.usecase';
import { RemoveQuestionUseCase } from 'src/core/usecase/question/remove-question.usecase';
import { UpdateQuestionUseCase } from 'src/core/usecase/question/update-question.usecase';
import { QuestionReposiotory } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AnswerReposiotory } from '../answer/answer.repository';

@Injectable()
export class QuestionService {
  private readonly createQuestionUseCase: CreateQuestionUseCase;
  private readonly updateQuestionUseCase: UpdateQuestionUseCase;
  private readonly removeQuestionUseCase: RemoveQuestionUseCase;
  constructor(
    private readonly questionRepo: QuestionReposiotory,
    private readonly answerRepo: AnswerReposiotory,
  ) {
    this.createQuestionUseCase = new CreateQuestionUseCase(
      questionRepo,
      answerRepo,
    );
    this.updateQuestionUseCase = new UpdateQuestionUseCase(questionRepo);
    this.removeQuestionUseCase = new RemoveQuestionUseCase(questionRepo);
  }

  async create(createQuestionDto: CreateQuestionDto) {
    const identifier = await this.questionRepo.getQuestionID();
    const answerIdentifier = await this.answerRepo.getAnswerID(
      createQuestionDto.answerId ?? '0',
    );
    return this.createQuestionUseCase.execute({
      identifier,
      property: { ...createQuestionDto, answer: answerIdentifier },
    });
  }

  findAll() {
    return this.questionRepo.findMany();
  }

  async findOne(id: string) {
    const identifier = await this.questionRepo.getQuestionID(id);
    return this.questionRepo.findOne(identifier);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const identifier = await this.questionRepo.getQuestionID(id);
    return this.updateQuestionUseCase.execute({
      identifier,
      property: updateQuestionDto,
    });
  }

  async remove(id: string) {
    const identifier = await this.questionRepo.getQuestionID(id);
    return this.removeQuestionUseCase.execute({
      identifier,
    });
  }
}
