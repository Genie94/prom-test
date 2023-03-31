import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionReposiotory } from './question.repository';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [AnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionReposiotory],
  exports: [QuestionReposiotory],
})
export class QuestionModule {}
