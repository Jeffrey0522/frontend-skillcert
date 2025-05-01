import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLessonDto {
    @IsOptional()
    @IsString()
    Name?: Buffer;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    Type?: string;

    @IsOptional()
    @IsString()
    Content?: Buffer;

    @IsOptional()
    @IsString()
    EstimatedTime?: Buffer;
}