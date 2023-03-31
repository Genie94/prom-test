import { Injectable } from '@nestjs/common';
import { Identifier, Repository } from 'src/core/domain';
import {
  AnswerDomain,
  AnswerDomainProperty,
} from 'src/core/domain/answer.domain';

export class AnswerID implements Identifier {
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
  increaseVersion(): AnswerID {
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
    return new AnswerID(this.type, this.id, this.version, this.status);
  }
}

@Injectable()
export class AnswerReposiotory
  implements Repository<AnswerDomain, AnswerDomainProperty>
{
  private store: AnswerDomain[] = [];
  private seq = 0;

  async getAnswerID(id?: string): Promise<Identifier> {
    const defaultId = new AnswerID(
      'AnswerDomain',
      id ?? `${this.seq}`,
      0,
      'activated',
    );
    if (id) {
      const findedDoamin = await this.findOne(defaultId);
      return findedDoamin
        ? (findedDoamin.getIdentifier() as AnswerID).clone()
        : defaultId;
    } else {
      this.seq++;
      return defaultId;
    }
  }
  async findOne(id: Identifier): Promise<AnswerDomain> {
    return await new Promise((resolve, reject) => {
      resolve(
        this.store
          .filter((domain) => id.equal(domain.getIdentifier()))
          .find((d) => (d.getIdentifier() as AnswerID).isActive()),
      );
    });
  }
  async findMany(property?: AnswerDomainProperty): Promise<AnswerDomain[]> {
    return await new Promise((resolve, reject) => {
      resolve(
        this.store.filter((d) => {
          const id = d.getIdentifier() as AnswerID;
          return id.isActive();
        }),
      );
    });
  }
  async delete(id: Identifier): Promise<boolean> {
    const deleteTarget = await this.findOne(id);
    (deleteTarget.getIdentifier() as AnswerID).delete();
    await this.save(deleteTarget);
    return true;
  }
  async save(domain: AnswerDomain): Promise<boolean> {
    const list = this.store.filter((item) => {
      return !(
        domain.isEqual(item) && (item.getIdentifier() as AnswerID).isActive()
      );
    });
    const beforeItem = await this.findOne(domain.getIdentifier());
    if (beforeItem) {
      (beforeItem.getIdentifier() as AnswerID).deprecate();
      (domain.getIdentifier() as AnswerID).increaseVersion();
      this.store = [...list, beforeItem, domain];
    } else {
      this.store = [...list, domain];
    }
    return true;
  }
  create(
    initialData: Partial<AnswerDomainProperty> & { identifier: Identifier },
  ): AnswerDomain {
    const defaultId = initialData.identifier;
    return new AnswerDomain(defaultId, {
      isMaster: initialData.isMaster ?? false,
      loincCode: initialData.loincCode ?? '',
      nameKr: initialData.nameKr ?? '',
      nameEn: initialData.nameEn ?? '',
      prop: initialData.prop ?? '2',
      type: initialData.type ?? 'TEXT',
      usage: initialData.usage ?? { isAvaliable: false, hasUsageLimit: false },
      options: initialData.options ?? [],
    });
  }
}
