import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupportTicketController } from "./controllers/support-ticket.controller";
import { SupportTicket } from "./entities/support-ticket.entity";
import { SupportTicketRepository } from "./repositories/support-ticket.repository";
import { SupportTicketService } from "./services/support-ticket.service";

@Module({
  imports: [TypeOrmModule.forFeature([SupportTicket])],
  controllers: [SupportTicketController],
  providers: [SupportTicketService, SupportTicketRepository],
  exports: [SupportTicketService],
})
export class SupportTicketModule {}
