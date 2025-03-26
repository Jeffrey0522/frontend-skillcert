import { TicketCategory } from "@/types/supportTicket"

interface ValidationResult {
  success: boolean
  errors?: string[]
}

/**
 * Validates support ticket data
 */
export function validateTicketData(data: any): ValidationResult {
  const errors: string[] = []

  // Check required fields
  if (!data.user_id) {
    errors.push("User ID is required")
  } else if (typeof data.user_id !== "number") {
    errors.push("User ID must be a number")
  }

  if (!data.category) {
    errors.push("Category is required")
  } else if (!Object.values(TicketCategory).includes(data.category)) {
    errors.push("Invalid category. Must be one of: PAYMENT, COURSE, CERTIFICATE, ACCOUNT, OTHER")
  }

  if (!data.subject) {
    errors.push("Subject is required")
  } else if (typeof data.subject !== "string") {
    errors.push("Subject must be a string")
  } else if (data.subject.length < 5 || data.subject.length > 150) {
    errors.push("Subject must be between 5 and 150 characters")
  }

  if (!data.description) {
    errors.push("Description is required")
  } else if (typeof data.description !== "string") {
    errors.push("Description must be a string")
  } else if (data.description.length < 10) {
    errors.push("Description must be at least 10 characters")
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  }
}

