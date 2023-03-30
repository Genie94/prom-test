import { Domain } from '.';

export class AnswerDomain extends Domain<AnswerDomainProperty> {}

export interface AnswerDomainProperty {
  isMaster: boolean;
  loincCode: string;
  nameKr: string;
  nameEn: string;
  prop: AnswerProp;
  type: AnswerType;
  usage: AnswerUsage;
  options: Option[];
}
export type AnswerProp = '2' | '3' | '4' | '5';
export type AnswerType = 'SELECT' | 'GRID' | 'DROP' | 'TEXT';
export interface AnswerUsage {
  isAvaliable: boolean;
  hasUsageLimit: boolean;
  period?: {
    start: Date;
    end: Date;
  };
}

export interface Option {
  loincCode: string;
  nameKr: string;
  nameEn: string;
  type: OptionType;
  order: number;
  score?: number;
  scoreData?: object;
}

export type OptionType = 'SELECT' | 'TEXT' | 'ROW' | 'COL';
