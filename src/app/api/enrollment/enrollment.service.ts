import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['course'] });
  }

  findOne(studentAddress: string, courseId: number): Promise<Enrollment | null> {
    return this.enrollmentRepository.findOne({
      where: { studentAddress, courseId },
      relations: ['course']
    });
  }

  create(data: Partial<Enrollment>): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create(data);
    return this.enrollmentRepository.save(enrollment);
  }

  async update(studentAddress: string, courseId: number, updates: Partial<Enrollment>): Promise<Enrollment> {
    await this.enrollmentRepository.update({ studentAddress, courseId }, updates);
    return this.findOne(studentAddress, courseId);
  }

  async delete(studentAddress: string, courseId: number): Promise<void> {
    await this.enrollmentRepository.delete({ studentAddress, courseId });
  }
}
