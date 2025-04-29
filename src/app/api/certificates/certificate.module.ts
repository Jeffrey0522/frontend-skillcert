import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { CertificateRepository } from './repositories/certificate.repository';

@Module({
    imports: [],
    controllers: [CertificateController],
    providers: [CertificateService, CertificateRepository],
    exports: [CertificateService]
})
export class CertificateModule { }