import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '../Courses/course.entity';

@Entity()
export class Enrollment {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  studentAddress: string;

  @PrimaryColumn('bigint')
  courseId: number;

  @Column('bigint')
  enrolledAt: number;

  @Column('boolean')
  completed: boolean;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
