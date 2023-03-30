import { Injectable } from '@nestjs/common';
import { Identifier, Repository } from 'src/core/domain';
import { RoleDomain, RoleDomainProperty } from 'src/core/domain/role.domain';

export class RoleID implements Identifier {
  constructor(private readonly type: string, private readonly id: string) {}
  equal(id: Identifier): boolean {
    return id.hashCode() === this.hashCode();
  }
  hashCode(): string {
    return `${this.type}:${this.id}`;
  }
}

@Injectable()
export class RoleRepository
  implements Repository<RoleDomain, RoleDomainProperty>
{
  private store: RoleDomain[] = [];
  private seq = 0;

  getRoleID(id?: string): Identifier {
    this.seq++;
    return new RoleID('RoleDomain', id ?? `${this.seq}`);
  }
  create(
    initialData: Partial<RoleDomainProperty> & { identifier: Identifier },
  ): RoleDomain {
    const defaultId = initialData.identifier;
    const defaultName = initialData.name ?? '';
    const defaultPermissions = initialData.permissions ?? [];
    const defaultGrantedUsers = initialData.grantedUsers ?? [];
    return new RoleDomain(defaultId, {
      name: defaultName,
      permissions: defaultPermissions,
      grantedUsers: defaultGrantedUsers,
    });
  }

  async findMany(property?: RoleDomainProperty): Promise<RoleDomain[]> {
    return await new Promise((resolve, reject) => {
      resolve(this.store);
    });
  }
  async save(domain: RoleDomain): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.store = this.store.filter((d) => !d.isEqual(domain));
      this.store.push(domain);
      resolve(true);
    });
  }
  async findOne(id: Identifier): Promise<RoleDomain> {
    return await new Promise((resolve, reject) => {
      resolve(this.store.find((domain) => id.equal(domain.getIdentifier())));
    });
  }
  async delete(id: Identifier): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.store = this.store.filter(
        (domain) => !id.equal(domain.getIdentifier()),
      );
      resolve(true);
    });
  }
}
