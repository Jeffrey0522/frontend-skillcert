
export interface CreateCertificateDto {
    CourseId: number;
    StudentAddress: string;
    InstitutionAddress: string;
    Status: boolean;
    Metadata?: any;
    IssuedAt: string;
}

export interface UpdateCertificateDto {
    CourseId?: number;
    StudentAddress?: string;
    InstitutionAddress?: string;
    Status?: boolean;
    Metadata?: any;
    IssuedAt?: string;
}