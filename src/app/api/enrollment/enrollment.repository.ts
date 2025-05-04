import { EntityRepository, Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@EntityRepository(Enrollment)
export class EnrollmentRepository extends Repository<Enrollment> {}
