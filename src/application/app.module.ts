import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [RoleModule, AnswerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
