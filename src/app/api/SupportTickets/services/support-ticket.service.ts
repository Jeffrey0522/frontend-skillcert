import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupportTicketRepository } from "../repositories/support-ticket.repository";
import { SupportTicket, TicketCategory, TicketStatus } from "../entities/support-ticket.entity";
import { CreateSupportTicketDto } from "../dto/create-support-ticket.dto";
import { UpdateSupportTicketDto } from "../dto/update-support-ticket.dto";

@Injectable()
export class SupportTicketService {
  private readonly logger = new Logger(SupportTicketService.name);

  constructor(
    @InjectRepository(SupportTicketRepository)
    private readonly supportTicketRepository: SupportTicketRepository
  ) {}

  async create(createSupportTicketDto: CreateSupportTicketDto): Promise<SupportTicket> {
    this.logger.log("Creating new support ticket");

    const ticket = new SupportTicket();
    ticket.UserId = createSupportTicketDto.UserId;
    ticket.Category = createSupportTicketDto.Category;
    ticket.Subject = createSupportTicketDto.Subject;
    ticket.Description = createSupportTicketDto.Description;
    ticket.Status = TicketStatus.OPEN;
    ticket.CreatedAt = Date.now();
    ticket.UpdatedAt = Date.now();

    return this.supportTicketRepository.save(ticket);
  }

  async findAll(): Promise<SupportTicket[]> {
    this.logger.log("Finding all support tickets");
    return this.supportTicketRepository.find({
      relations: ["user"],
      order: { CreatedAt: "DESC" },
    });
  }

  async findOne(id: number): Promise<SupportTicket> {
    this.logger.log(`Finding support ticket with ID: ${id}`);
    return this.supportTicketRepository.findTicketById(id);
  }

  async findByUserId(userId: number): Promise<SupportTicket[]> {
    this.logger.log(`Finding support tickets for user ID: ${userId}`);
    return this.supportTicketRepository.findTicketsByUserId(userId);
  }

  async update(id: number, updateSupportTicketDto: UpdateSupportTicketDto): Promise<SupportTicket> {
    this.logger.log(`Updating support ticket with ID: ${id}`);

    const ticket = await this.supportTicketRepository.findOne({ where: { Id: id } });
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    if (updateSupportTicketDto.Status) {
      ticket.Status = updateSupportTicketDto.Status;
    }
    if (updateSupportTicketDto.AdminId) {
      ticket.AdminId = updateSupportTicketDto.AdminId;
    }
    ticket.UpdatedAt = Date.now();

    return this.supportTicketRepository.save(ticket);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing support ticket with ID: ${id}`);
    await this.supportTicketRepository.delete(id);
  }
}
