
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Certificate } from '../entities/certificate.entity';

@Injectable()
export class CertificateRepository extends Repository<Certificate> {
    constructor(private dataSource: DataSource) {
        super(Certificate, dataSource.createEntityManager());
    }

    async findAllCertificates(): Promise<Certificate[]> {
        return this.find();
    }

    async findCertificateById(id: number): Promise<Certificate> {
        return this.findOneBy({ Id: id });
    }

    async findCertificatesByStudentAddress(studentAddress: string): Promise<Certificate[]> {
        return this.find({ where: { StudentAddress: studentAddress } });
    }

    async findCertificatesByCourseId(courseId: number): Promise<Certificate[]> {
        return this.find({ where: { CourseId: courseId } });
    }

    async findCertificatesByInstitutionAddress(institutionAddress: string): Promise<Certificate[]> {
        return this.find({ where: { InstitutionAddress: institutionAddress } });
    }

    async findActiveCertificates(): Promise<Certificate[]> {
        return this.find({ where: { Status: true } });
    }
}