import {
  ParticipantsType,
  QuestionDomainProperty,
  QuestionrUsage,
  ResponsePeriod,
} from 'src/core/domain/question.domain';

export class CreateQuestionDto implements QuestionDomainProperty {
  isMaster: boolean;
  loincCode: string;
  nameKr: string;
  nameEn: string;
  scoringCode: string;
  participantsType: ParticipantsType;
  definition: string;
  directive: string;
  responsePeriod: ResponsePeriod;
  usage: QuestionrUsage;
  keyword: string[];
  isSubjective: boolean;
  answerId?: string;
}
