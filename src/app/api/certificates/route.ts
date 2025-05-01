// src/app/api/certificates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto, UpdateCertificateDto } from './dto/certificate.dto';
import { PrismaClient, Prisma } from '@prisma/client';

const certificateService = new CertificateService();

function processMetadataForResponse(certificate: any) {
    if (certificate.Metadata && Buffer.isBuffer(certificate.Metadata)) {
        try {
            certificate.Metadata = JSON.parse(certificate.Metadata.toString());
        } catch (e) {
            certificate.Metadata = certificate.Metadata.toString();
        }
    }
    return certificate;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const studentAddress = searchParams.get('studentAddress');
        const courseId = searchParams.get('courseId');
        const institutionAddress = searchParams.get('institutionAddress');
        const active = searchParams.get('active');
        const id = searchParams.get('id');

        let certificates;

        if (id) {
            // Get a specific certificate by ID
            try {
                const certificate = await certificateService.findOne(Number(id));
                const processedCertificate = processMetadataForResponse(certificate);
                return NextResponse.json(processedCertificate);
            } catch (error) {
                return NextResponse.json(
                    { message: `Certificate with ID ${id} not found` },
                    { status: 404 }
                );
            }
        } else if (studentAddress) {
            certificates = await certificateService.findByStudentAddress(studentAddress);
        } else if (courseId) {
            certificates = await certificateService.findByCourseId(Number(courseId));
        } else if (institutionAddress) {
            certificates = await certificateService.findByInstitutionAddress(institutionAddress);
        } else if (active === 'true') {
            certificates = await certificateService.findActive();
        } else {
            certificates = await certificateService.findAll();
        }

        // Process metadata for response if we're returning a list
        if (Array.isArray(certificates)) {
            certificates = certificates.map(processMetadataForResponse);
        }

        return NextResponse.json(certificates);
    } catch (error) {
        console.error('Error in GET certificates:', error);
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: CreateCertificateDto = await request.json();
        const certificate = await certificateService.create(body);
        const processedCertificate = processMetadataForResponse(certificate);
        return NextResponse.json(processedCertificate, { status: 201 });
    } catch (error) {
        console.error('Error in POST certificate:', error);

        // Handle Prisma unique constraint errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { message: 'A certificate with this ID already exists' },
                    { status: 409 }
                );
            }
        }

        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'Certificate ID is required' },
                { status: 400 }
            );
        }

        const body: UpdateCertificateDto = await request.json();
        const certificate = await certificateService.update(Number(id), body);
        const processedCertificate = processMetadataForResponse(certificate);
        return NextResponse.json(processedCertificate);
    } catch (error) {
        console.error('Error in PATCH certificate:', error);

        // Handle Prisma not found errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: 'Certificate not found' },
                    { status: 404 }
                );
            }
        }

        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            { message: errorMessage },
            { status: error instanceof Error && error.message.includes('not found') ? 404 : 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'Certificate ID is required' },
                { status: 400 }
            );
        }

        await certificateService.remove(Number(id));
        return NextResponse.json({ message: 'Certificate successfully deleted' });
    } catch (error) {
        console.error('Error in DELETE certificate:', error);

        // Handle Prisma not found errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: 'Certificate not found' },
                    { status: 404 }
                );
            }
        }

        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            { message: errorMessage },
            { status: error instanceof Error && error.message.includes('not found') ? 404 : 500 }
        );
    }
}