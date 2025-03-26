import db from "@/database/connection"
import { type SupportTicket, TicketStatus, type CreateTicketDto } from "@/types/supportTicket"

/**
 * Creates a new support ticket
 * Implements requirement: Submit a Support Ticket
 */
export async function createTicket(ticketData: CreateTicketDto): Promise<SupportTicket> {
  try {
    const now = Math.floor(Date.now() / 1000) // Unix timestamp in seconds

    // In a real implementation with Prisma:
    const newTicket = await db.supportTicket.create({
      data: {
        user_id: ticketData.user_id,
        category: ticketData.category,
        subject: ticketData.subject,
        description: ticketData.description,
        status: TicketStatus.OPEN,
        created_at: now,
        updated_at: now,
      },
    })

    return newTicket as SupportTicket
  } catch (error) {
    console.error("Error in createTicket service:", error)
    throw error
  }
}

/**
 * Gets a support ticket by ID
 */
export async function getTicketById(ticketId: number): Promise<SupportTicket | null> {
  try {
    // In a real implementation with Prisma:
    const ticket = await db.supportTicket.findUnique({
      where: { id: ticketId },
    })

    return ticket as SupportTicket | null
  } catch (error) {
    console.error(`Error in getTicketById service for ticket ${ticketId}:`, error)
    throw error
  }
}

/**
 * Gets all support tickets for a specific user
 * Implements requirement: List All Tickets for a User
 */
export async function getTicketsByUser(userId: number): Promise<SupportTicket[]> {
  try {
    // In a real implementation with Prisma:
    const tickets = await db.supportTicket.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    })

    return tickets as SupportTicket[]
  } catch (error) {
    console.error(`Error in getTicketsByUser service for user ${userId}:`, error)
    throw error
  }
}

/**
 * Gets all open and in-progress tickets (for admin dashboard)
 * Implements requirement: List Open Tickets (Admin Only)
 */
export async function getAllOpenTickets(): Promise<SupportTicket[]> {
  try {
    // In a real implementation with Prisma:
    const tickets = await db.supportTicket.findMany({
      where: {
        status: {
          in: [TicketStatus.OPEN, TicketStatus.IN_PROGRESS],
        },
      },
      orderBy: { created_at: "asc" }, // Oldest first
    })

    return tickets as SupportTicket[]
  } catch (error) {
    console.error("Error in getAllOpenTickets service:", error)
    throw error
  }
}

/**
 * Assigns a ticket to an admin
 * Implements requirement: Assign a Ticket to an Admin (Admin Only)
 */
export async function assignTicketToAdmin(ticketId: number, adminId: number): Promise<SupportTicket | null> {
  try {
    const now = Math.floor(Date.now() / 1000)

    // In a real implementation with Prisma:
    const updatedTicket = await db.supportTicket.update({
      where: { id: ticketId },
      data: {
        admin_id: adminId,
        status: TicketStatus.IN_PROGRESS, // Automatically set to In Progress when assigned
        updated_at: now,
      },
    })

    return updatedTicket as SupportTicket
  } catch (error) {
    console.error(`Error in assignTicketToAdmin service for ticket ${ticketId}:`, error)
    throw error
  }
}

/**
 * Updates the status of a ticket
 * Implements requirement: Update Ticket Status (Admin Only)
 */
export async function updateTicketStatus(ticketId: number, status: TicketStatus): Promise<SupportTicket | null> {
  try {
    const now = Math.floor(Date.now() / 1000)

    // In a real implementation with Prisma:
    const updatedTicket = await db.supportTicket.update({
      where: { id: ticketId },
      data: {
        status,
        updated_at: now,
      },
    })

    return updatedTicket as SupportTicket
  } catch (error) {
    console.error(`Error in updateTicketStatus service for ticket ${ticketId}:`, error)
    throw error
  }
}

/**
 * Closes a ticket
 * Implements requirement: Close a Ticket (Admin Only)
 */
export async function closeTicket(ticketId: number): Promise<SupportTicket | null> {
  try {
    const now = Math.floor(Date.now() / 1000)

    // In a real implementation with Prisma:
    const updatedTicket = await db.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: TicketStatus.CLOSED,
        updated_at: now,
      },
    })

    return updatedTicket as SupportTicket
  } catch (error) {
    console.error(`Error in closeTicket service for ticket ${ticketId}:`, error)
    throw error
  }
}

/**
 * Deletes a ticket
 * Implements requirement: Delete Ticket (Admin Only)
 */
export async function deleteTicket(ticketId: number): Promise<boolean> {
  try {
    // In a real implementation with Prisma:
    await db.supportTicket.delete({
      where: { id: ticketId },
    })

    return true
  } catch (error) {
    console.error(`Error in deleteTicket service for ticket ${ticketId}:`, error)
    throw error
  }
}

