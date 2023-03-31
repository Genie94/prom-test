export interface Identifier {
  equal(id: Identifier): boolean;
  hashCode(): string;
}
function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
export abstract class Domain<P> {
  constructor(
    protected readonly identifier: Identifier,
    protected readonly property: P,
  ) {}
  isEqual(domain: Domain<P>) {
    return this.identifier.equal(domain.getIdentifier());
  }
  getIdentifier() {
    return this.identifier;
  }
  getProperty() {
    return deepCopy(this.property);
  }
}
export interface DomainFactory<P, D> {
  create(initialData: Partial<P> & { identifier: Identifier }): D;
}
export interface Repository<T extends Domain<P>, P>
  extends DomainFactory<P, T> {
  findOne(id: Identifier): Promise<T>;
  findMany(property?: P): Promise<T[]>;
  delete(id: Identifier): Promise<boolean>;
  save(domain: T): Promise<boolean>;
}
export interface UseCase<T, K> {
  execute(command: T): K;
}
