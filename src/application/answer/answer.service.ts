import { Injectable } from '@nestjs/common';
import { CreateAnswerUseCase } from 'src/core/usecase/answer/create-answer.usecase';
import { RemoveAnswerUseCase } from 'src/core/usecase/answer/remove-answer.usecase';
import { UpdateAnswerUseCase } from 'src/core/usecase/answer/update-answer.usecase';
import { AnswerReposiotory } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  private readonly createAnswerUseCase: CreateAnswerUseCase;
  private readonly updateAnswerUseCase: UpdateAnswerUseCase;
  private readonly removeAnswerUseCase: RemoveAnswerUseCase;
  constructor(private readonly answerRepo: AnswerReposiotory) {
    this.createAnswerUseCase = new CreateAnswerUseCase(answerRepo);
    this.updateAnswerUseCase = new UpdateAnswerUseCase(answerRepo);
    this.removeAnswerUseCase = new RemoveAnswerUseCase(answerRepo);
  }

  async create(createAnswerDto: CreateAnswerDto) {
    const identifier = await this.answerRepo.getAnswerID();
    return this.createAnswerUseCase.execute({
      identifier,
      property: createAnswerDto,
    });
  }

  findAll() {
    return this.answerRepo.findMany();
  }

  async findOne(id: string) {
    const identifier = await this.answerRepo.getAnswerID(id);
    return this.answerRepo.findOne(identifier);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const identifier = await this.answerRepo.getAnswerID(id);
    return this.updateAnswerUseCase.execute({
      identifier,
      property: updateAnswerDto,
    });
  }

  async remove(id: string) {
    const identifier = await this.answerRepo.getAnswerID(id);
    return this.removeAnswerUseCase.execute({
      identifier,
    });
  }
}
