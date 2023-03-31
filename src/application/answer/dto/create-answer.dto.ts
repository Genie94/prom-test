import {
  AnswerDomainProperty,
  AnswerProp,
  AnswerType,
  AnswerUsage,
  Option,
} from 'src/core/domain/answer.domain';

export class CreateAnswerDto implements AnswerDomainProperty {
  isMaster: boolean;
  loincCode: string;
  nameKr: string;
  nameEn: string;
  prop: AnswerProp;
  type: AnswerType;
  usage: AnswerUsage;
  options: Option[];
}
