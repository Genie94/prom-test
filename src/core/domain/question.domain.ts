import { Domain, Identifier } from '.';
export class QuestionDomain extends Domain<QuestionDomainProperty> {}

export interface QuestionDomainProperty {
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
  answer?: Identifier;
}
export type ParticipantsType = 'doctor' | 'patient';
export type ResponsePeriod = 'M' | 'W' | 'D';
export interface QuestionrUsage {
  isAvaliable: boolean;
  hasUsageLimit: boolean;
  period?: {
    start: Date;
    end: Date;
  };
}
