import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerReposiotory } from './answer.repository';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, AnswerReposiotory],
  exports: [AnswerReposiotory],
})
export class AnswerModule {}
