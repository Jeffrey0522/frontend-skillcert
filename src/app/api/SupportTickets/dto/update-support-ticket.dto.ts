import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { TicketStatus } from "../entities/support-ticket.entity";

export class UpdateSupportTicketDto {
  @IsEnum(TicketStatus)
  @IsOptional()
  Status?: TicketStatus;

  @IsNumber()
  @IsOptional()
  AdminId?: number;
}
