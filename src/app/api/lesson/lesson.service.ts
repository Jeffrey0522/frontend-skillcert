import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>
    ) { }

    async create(createLessonDto: Partial<Lesson>): Promise<Lesson> {
        try {
            const lesson = this.lessonRepository.create(createLessonDto);
            return this.lessonRepository.save(lesson);
        } catch (error) {
            console.error('Error creating lesson:', error);
            throw new Error('Failed to create lesson');

        }
    }

    async removeLesson(id: number): Promise<void> {
        try {
            await this.lessonRepository.delete(id);
        } catch (error) {
            console.error('Error deleting lesson:', error);
            throw new Error('Failed to delete lesson');

        }
    }

    async updateLesson(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
        try {
            await this.lessonRepository.update(id, updateLessonDto);
            return this.lessonRepository.findOne({ where: { Id: id } });
        } catch (error) {
            console.error('Error updating lesson:', error);
            throw new Error('Failed to update lesson');

        }
    }

    async findAll(): Promise<Lesson[]> {
        try {
            return this.lessonRepository.find();
        } catch (error) {
            console.error('Error finding all lessons:', error);
            throw new Error('Failed to find lessons');

        }
    }
    
    async findOne(id: number): Promise<Lesson> {
        try {
            return this.lessonRepository.findOne({ where: { Id: id } });
        } catch (error) {
            console.error('Error finding lesson:', error);
            throw new Error('Failed to find lesson');

        }
    }
}

