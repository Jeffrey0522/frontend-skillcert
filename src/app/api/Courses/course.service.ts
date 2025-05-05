import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({ id });
  }

  create(course: Partial<Course>): Promise<Course> {
    const newCourse = this.courseRepository.create(course);
    return this.courseRepository.save(newCourse);
  }

  async update(id: number, updates: Partial<Course>): Promise<Course> {
    await this.courseRepository.update(id, updates);
    return this.courseRepository.findOneBy({ id });
  }

  delete(id: number): Promise<void> {
    return this.courseRepository.delete(id).then(() => undefined);
  }
}