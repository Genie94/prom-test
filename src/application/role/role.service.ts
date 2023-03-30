import { Injectable } from '@nestjs/common';
import { CreateRoleUseCase } from 'src/core/usecase/role/create-role.usecase';
import { RemoveRoleUseCase } from 'src/core/usecase/role/remove-role.usecase';
import { UpdateRoleUseCase } from 'src/core/usecase/role/update-role.usecase';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  private readonly createRoleUseCase: CreateRoleUseCase;
  private readonly updateRoleUseCase: UpdateRoleUseCase;
  private readonly removeRoleUseCase: RemoveRoleUseCase;
  constructor(private readonly roleRepo: RoleRepository) {
    this.createRoleUseCase = new CreateRoleUseCase(roleRepo);
    this.updateRoleUseCase = new UpdateRoleUseCase(roleRepo);
    this.removeRoleUseCase = new RemoveRoleUseCase(roleRepo);
  }

  create(createRoleDto: CreateRoleDto) {
    return this.createRoleUseCase.execute({
      identifier: this.roleRepo.getRoleID(),
      property: createRoleDto,
    });
  }
  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.updateRoleUseCase.execute({
      identifier: this.roleRepo.getRoleID(id),
      property: updateRoleDto,
    });
  }
  remove(id: string) {
    return this.removeRoleUseCase.execute({
      identifier: this.roleRepo.getRoleID(id),
    });
  }
  findAll() {
    return this.roleRepo.findMany();
  }
  findOne(id: string) {
    return this.roleRepo.findOne(this.roleRepo.getRoleID(id));
  }
}
