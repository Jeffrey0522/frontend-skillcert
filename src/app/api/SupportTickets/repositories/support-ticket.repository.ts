import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SupportTicket } from "../entities/support-ticket.entity";

@Injectable()
export class SupportTicketRepository extends Repository<SupportTicket> {
  constructor(private dataSource: DataSource) {
    super(SupportTicket, dataSource.createEntityManager());
  }

  async findTicketsByUserId(userId: number): Promise<SupportTicket[]> {
    return this.find({
      where: { UserId: userId },
      relations: ["user"],
      order: { CreatedAt: "DESC" },
    });
  }

  async findTicketById(id: number): Promise<SupportTicket> {
    return this.findOne({
      where: { Id: id },
      relations: ["user"],
    });
  }

  async updateTicketStatus(
    id: number,
    status: string,
    adminId?: number
  ): Promise<SupportTicket> {
    const ticket = await this.findOne({ where: { Id: id } });
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.Status = status as any;
    if (adminId) {
      ticket.AdminId = adminId;
    }
    ticket.UpdatedAt = Date.now();

    return this.save(ticket);
  }
}
