import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    Name: Buffer;

    @IsString()
    @MaxLength(50)
    Type: string;

    @IsOptional()
    EstimatedTime?: Buffer;
}