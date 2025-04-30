import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import {
    CreateCertificateDto,
    UpdateCertificateDto,
} from './dto/certificate.dto';

import { Certificate } from './entities/certificate.entity';

@Controller('certificates')
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) { }

    @Post()
    async create(@Body() createCertificateDto: CreateCertificateDto) {
        // Ensure that the CourseId is included and correct
        if (!createCertificateDto.CourseId) {
            throw new Error('Course ID is required');
        }

        return this.certificateService.create(createCertificateDto);
    }

    @Get()
    findAll(
        @Query('studentAddress') studentAddress?: string,
        @Query('courseId') courseId?: number,
        @Query('institutionAddress') institutionAddress?: string,
        @Query('active') active?: boolean,
    ): Promise<Certificate[]> {
        return this.certificateService.findWithFilters({
            studentAddress,
            courseId,
            institutionAddress,
            active,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
        const numericId = parseInt(id, 10);
        const certificate = await this.certificateService.findOne(numericId);
        const metadata = this.certificateService.parseMetadata(certificate); // Parse metadata

        return {
            ...certificate,
            metadata, // Return the parsed metadata along with the certificate
        };
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCertificateDto: UpdateCertificateDto,
    ): Promise<Certificate> {
        const numericId = parseInt(id, 10);
        return this.certificateService.update(numericId, updateCertificateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        const numericId = parseInt(id, 10);
        return this.certificateService.remove(numericId);
    }
}
