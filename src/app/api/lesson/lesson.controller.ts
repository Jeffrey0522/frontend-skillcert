import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Post()
    create(@Body() createLessonDto: CreateLessonDto) {
        return this.lessonService.create(createLessonDto);
    }

    @Get()
    findAll() {
        return this.lessonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lessonService.findOne(parseInt(id));
    }

    @Put(':id')
    updateLesson(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
        return this.lessonService.updateLesson(parseInt(id), updateLessonDto);
    }

    @Delete(':id')
    removeLesson(@Param('id') id: string) {
        return this.lessonService.removeLesson(parseInt(id));
    }
}