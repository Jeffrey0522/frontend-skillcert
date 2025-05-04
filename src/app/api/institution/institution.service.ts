import { Injectable, NotFoundException } from '@nestjs/common';
import { InstitutionRepository } from './institution.repository';
import { Institution } from './institution.entity';

@Injectable()
export class InstitutionService {
  constructor(private readonly repo: InstitutionRepository) {}

  findAll(): Promise<Institution[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Institution> {
    const inst = await this.repo.findOneBy({ id });
    if (!inst) throw new NotFoundException(`Institution ${id} not found`);
    return inst;
  }

  create(data: Institution): Promise<Institution> {
    return this.repo.save(data);
  }

  async update(id: number, updates: Partial<Institution>): Promise<Institution> {
    const inst = await this.findOne(id);
    Object.assign(inst, updates);
    return this.repo.save(inst);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Institution ${id} not found`);
  }
}
