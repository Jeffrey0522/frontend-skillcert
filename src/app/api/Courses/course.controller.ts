import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() course: Partial<Course>): Promise<Course> {
    return this.courseService.create(course);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updates: Partial<Course>): Promise<Course> {
    return this.courseService.update(id, updates);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.courseService.delete(id);
  }
}
