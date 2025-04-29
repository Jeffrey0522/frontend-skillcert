
import { prisma } from '../../../lib/prisma';
import { Certificate } from './entities/certificate.entity';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
} from './dto/certificate.dto';
import { HttpException } from '@nestjs/common';


export class CertificateService {
  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    const metadata = this.prepareMetadata(createCertificateDto.Metadata);

    const result = await prisma.certificate.create({
      data: {

        course: {
          connect: { id: createCertificateDto.CourseId } // Connecting the course by its ID
        },
        studentAddress: createCertificateDto.StudentAddress,
        institutionAddress: createCertificateDto.InstitutionAddress,
        status: createCertificateDto.Status,
        metadata,
        issuedAt: new Date(createCertificateDto.IssuedAt),
      },
    });

    return this.mapToEntity(result);
  }

  async findAll(): Promise<Certificate[]> {
    const certificates = await prisma.certificate.findMany();


    if (!certificates || certificates.length === 0) {
      throw new Error('No certificates found');
    }

    return certificates.map(this.mapToEntity);
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      throw new Error(`Certificate with ID ${id} not found`);
    }

    return this.mapToEntity(certificate);
  }



  async findWithFilters(filters: {
    studentAddress?: string;
    courseId?: number;
    institutionAddress?: string;
    active?: boolean;
  }): Promise<Certificate[]> {
    const certificates = await prisma.certificate.findMany({
      where: {
        studentAddress: filters.studentAddress,
        courseId: filters.courseId,
        institutionAddress: filters.institutionAddress,
        status: filters.active,
      },
    });

    return certificates.map(this.mapToEntity);
  }

  async update(id: number, updateDto: UpdateCertificateDto): Promise<Certificate> {
    await this.findOne(id); // Ensure existence

    const data: any = {};

    if (updateDto.CourseId !== undefined) data.courseId = updateDto.CourseId;
    if (updateDto.StudentAddress !== undefined) data.studentAddress = updateDto.StudentAddress;
    if (updateDto.InstitutionAddress !== undefined) data.institutionAddress = updateDto.InstitutionAddress;
    if (updateDto.Status !== undefined) data.status = updateDto.Status;
    if (updateDto.Metadata !== undefined) data.metadata = this.prepareMetadata(updateDto.Metadata);
    if (updateDto.IssuedAt !== undefined) data.issuedAt = new Date(updateDto.IssuedAt);

    if (Object.keys(data).length === 0) return this.findOne(id); // Nothing to update

    const updated = await prisma.certificate.update({
      where: { id },
      data,
    });

    return this.mapToEntity(updated);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure existence
    await prisma.certificate.delete({ where: { id } });
  }

  parseMetadata(certificate: Certificate): any {
    const raw = certificate?.Metadata;

    if (!raw) return null;

    try {
      return JSON.parse(Buffer.isBuffer(raw) ? raw.toString() : String(raw));
    } catch {
      return Buffer.isBuffer(raw) ? raw.toString() : raw;
    }
  }

  private prepareMetadata(input: any): Buffer {
    if (input === undefined || input === null) return Buffer.from('');
    return Buffer.from(
      typeof input === 'object' ? JSON.stringify(input) : String(input),
    );
  }

  private mapToEntity(prismaModel: any): Certificate {
    return {
      Id: prismaModel.id,
      CourseId: prismaModel.courseId,
      StudentAddress: prismaModel.studentAddress,
      InstitutionAddress: prismaModel.institutionAddress,
      Status: prismaModel.status,
      Metadata: prismaModel.metadata,
      IssuedAt: prismaModel.issuedAt,
    };
  }
}
