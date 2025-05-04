import { IsBase64, IsNumber } from 'class-validator';

export class CreateInstitutionDto {
  @IsNumber()
  id: number;

  @IsBase64()
  title: string;
}
