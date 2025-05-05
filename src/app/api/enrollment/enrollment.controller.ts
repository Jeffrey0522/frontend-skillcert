import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentService.findAll();
  }

  @Get(':studentAddress/:courseId')
  findOne(@Param('studentAddress') studentAddress: string, @Param('courseId') courseId: number): Promise<Enrollment | null> {
    return this.enrollmentService.findOne(studentAddress, courseId);
  }

  @Post()
  create(@Body() enrollment: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentService.create(enrollment);
  }

  @Put(':studentAddress/:courseId')
  update(
    @Param('studentAddress') studentAddress: string,
    @Param('courseId') courseId: number,
    @Body() updates: Partial<Enrollment>
  ): Promise<Enrollment> {
    return this.enrollmentService.update(studentAddress, courseId, updates);
  }

  @Delete(':studentAddress/:courseId')
  remove(
    @Param('studentAddress') studentAddress: string,
    @Param('courseId') courseId: number
  ): Promise<void> {
    return this.enrollmentService.delete(studentAddress, courseId);
  }
}
