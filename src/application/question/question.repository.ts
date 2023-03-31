import { Injectable } from '@nestjs/common';
import { Identifier, Repository } from 'src/core/domain';
import {
  QuestionDomain,
  QuestionDomainProperty,
} from 'src/core/domain/question.domain';

export class QuestionID implements Identifier {
  constructor(
    private readonly type: string,
    private readonly id: string,
    private version: number,
    private status: 'deprecated' | 'activated' | 'deleted',
  ) {}
  equal(id: Identifier): boolean {
    return id.hashCode() === this.hashCode();
  }
  hashCode(): string {
    return `${this.type}:${this.id}`;
  }
  increaseVersion(): QuestionID {
    if (this.status === 'deprecated') {
      throw new Error('this Identifier is already deprecated');
    }
    this.version = this.version + 1;
    return this;
  }
  isActive() {
    return this.status === 'activated';
  }
  deprecate() {
    this.status = 'deprecated';
  }
  delete() {
    this.status = 'deleted';
  }
  clone() {
    return new QuestionID(this.type, this.id, this.version, this.status);
  }
}

@Injectable()
export class QuestionReposiotory
  implements Repository<QuestionDomain, QuestionDomainProperty>
{
  private store: QuestionDomain[] = [];
  private seq = 0;

  async getQuestionID(id?: string): Promise<Identifier> {
    const defaultId = new QuestionID(
      'QuestionDomain',
      id ?? `${this.seq}`,
      0,
      'activated',
    );
    if (id) {
      const findedDoamin = await this.findOne(defaultId);
      return findedDoamin
        ? (findedDoamin.getIdentifier() as QuestionID).clone()
        : defaultId;
    } else {
      this.seq++;
      return defaultId;
    }
  }
  async findOne(id: Identifier): Promise<QuestionDomain> {
    return await new Promise((resolve, reject) => {
      resolve(
        this.store
          .filter((domain) => id.equal(domain.getIdentifier()))
          .find((d) => (d.getIdentifier() as QuestionID).isActive()),
      );
    });
  }
  async findMany(property?: QuestionDomainProperty): Promise<QuestionDomain[]> {
    return await new Promise((resolve, reject) => {
      resolve(
        this.store.filter((d) => {
          const id = d.getIdentifier() as QuestionID;
          return id.isActive();
        }),
      );
    });
  }
  async delete(id: Identifier): Promise<boolean> {
    const deleteTarget = await this.findOne(id);
    (deleteTarget.getIdentifier() as QuestionID).delete();
    await this.save(deleteTarget);
    return true;
  }
  async save(domain: QuestionDomain): Promise<boolean> {
    const list = this.store.filter((item) => {
      return !(
        domain.isEqual(item) && (item.getIdentifier() as QuestionID).isActive()
      );
    });
    const beforeItem = await this.findOne(domain.getIdentifier());
    if (beforeItem) {
      (beforeItem.getIdentifier() as QuestionID).deprecate();
      (domain.getIdentifier() as QuestionID).increaseVersion();
      this.store = [...list, beforeItem, domain];
    } else {
      this.store = [...list, domain];
    }
    return true;
  }
  create(
    initialData: Partial<QuestionDomainProperty> & { identifier: Identifier },
  ): QuestionDomain {
    const defaultId = initialData.identifier;
    return new QuestionDomain(defaultId, {
      isMaster: initialData.isMaster ?? false,
      loincCode: initialData.loincCode ?? '',
      nameKr: initialData.nameKr ?? '',
      nameEn: initialData.nameEn ?? '',
      scoringCode: initialData.scoringCode ?? '',
      participantsType: initialData.participantsType ?? 'doctor',
      definition: initialData.definition ?? '',
      directive: initialData.directive ?? '',
      responsePeriod: initialData.responsePeriod ?? 'M',
      isSubjective: initialData.isSubjective ?? true,
      answer: initialData.answer,
      usage: initialData.usage ?? { isAvaliable: false, hasUsageLimit: false },
      keyword: initialData.keyword ?? [],
    });
  }
}
