import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { SupportTicketService } from "../services/support-ticket.service";
import { CreateSupportTicketDto } from "../dto/create-support-ticket.dto";
import { UpdateSupportTicketDto } from "../dto/update-support-ticket.dto";
import { SupportTicket } from "../entities/support-ticket.entity";

@Controller("support-tickets")
export class SupportTicketController {
  private readonly logger = new Logger(SupportTicketController.name);

  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  async create(
    @Body() createSupportTicketDto: CreateSupportTicketDto
  ): Promise<SupportTicket> {
    this.logger.log("Creating new support ticket");
    return this.supportTicketService.create(createSupportTicketDto);
  }

  @Get()
  async findAll(): Promise<SupportTicket[]> {
    this.logger.log("Finding all support tickets");
    return this.supportTicketService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<SupportTicket> {
    this.logger.log(`Finding support ticket with ID: ${id}`);
    return this.supportTicketService.findOne(+id);
  }

  @Get("user/:userId")
  async findByUserId(@Param("userId") userId: string): Promise<SupportTicket[]> {
    this.logger.log(`Finding support tickets for user ID: ${userId}`);
    return this.supportTicketService.findByUserId(+userId);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSupportTicketDto: UpdateSupportTicketDto
  ): Promise<SupportTicket> {
    this.logger.log(`Updating support ticket with ID: ${id}`);
    return this.supportTicketService.update(+id, updateSupportTicketDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    this.logger.log(`Removing support ticket with ID: ${id}`);
    return this.supportTicketService.remove(+id);
  }
}
