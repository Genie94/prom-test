import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [RoleModule, AnswerModule, QuestionModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
