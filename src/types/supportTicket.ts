/**
 * Enum for support ticket categories
 */
export enum TicketCategory {
    PAYMENT = "PAYMENT",
    COURSE = "COURSE",
    CERTIFICATE = "CERTIFICATE",
    ACCOUNT = "ACCOUNT",
    OTHER = "OTHER",
  }
  
  /**
   * Enum for support ticket statuses
   */
  export enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED",
  }
  
  /**
   * Interface for support ticket entity
   * Matches exactly the schema from the requirements
   */
  export interface SupportTicket {
    id: number // u64: Unique identifier for the support ticket
    user_id: number // u64: Foreign key to the users table (who submitted the ticket)
    category: TicketCategory // Enum: Type of issue reported
    subject: string // String (max 150): Short title summarizing the issue
    description: string // Text: Detailed description of the issue
    status: TicketStatus // Enum: Current status of the ticket
    admin_id: number | null // u64 (nullable): Admin assigned to the ticket
    created_at: number // u64 (timestamp): Time when the ticket was created
    updated_at: number // u64 (timestamp): Time when the ticket was last updated
  }
  
  /**
   * Interface for creating a new support ticket
   */
  export interface CreateTicketDto {
    user_id: number
    category: TicketCategory
    subject: string
    description: string
  }
  
  /**
   * Interface for updating a ticket status
   */
  export interface UpdateTicketStatusDto {
    status: TicketStatus
  }
  
  /**
   * Interface for assigning a ticket to an admin
   */
  export interface AssignTicketDto {
    admin_id: number
  }
  
  