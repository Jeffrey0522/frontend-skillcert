import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { TicketCategory } from "../entities/support-ticket.entity";

export class CreateSupportTicketDto {
  @IsNumber()
  @IsNotEmpty()
  UserId: number;

  @IsEnum(TicketCategory)
  @IsNotEmpty()
  Category: TicketCategory;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Subject: string;

  @IsString()
  @IsNotEmpty()
  Description: string;
}
