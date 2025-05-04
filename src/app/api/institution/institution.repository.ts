import { DataSource, Repository } from 'typeorm';
import { Institution } from './institution.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstitutionRepository extends Repository<Institution> {
  constructor(dataSource: DataSource) {
    super(Institution, dataSource.createEntityManager());
  }
}
