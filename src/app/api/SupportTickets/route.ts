import { type NextRequest, NextResponse } from "next/server"
import { createTicket, getTicketsByUser, getAllOpenTickets } from "./supportTicket.service"
import { validateTicketData } from "@/lib/validators/supportTicketValidator"

/**
 * POST /api/SupportTickets
 * Creates a new support ticket
 * Implements requirement: Submit a Support Ticket
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request data
    const validationResult = validateTicketData(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid ticket data", details: validationResult.errors }, { status: 400 })
    }

    const ticket = await createTicket(body)
    return NextResponse.json(ticket, { status: 201 })
  } catch (error: any) {
    console.error("Error creating support ticket:", error)
    return NextResponse.json({ error: "Failed to create support ticket", message: error.message }, { status: 500 })
  }
}

/**
 * GET /api/SupportTickets
 * Gets tickets based on query parameters
 * - userId: Get tickets for a specific user (List All Tickets for a User)
 * - admin=true: Get all open tickets (List Open Tickets - Admin Only)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const adminView = searchParams.get("admin") === "true"

    // Check if user is authorized to view these tickets
    // This is a placeholder for actual auth logic
    const currentUser = { id: 123, isAdmin: true } // Replace with actual user from auth

    if (userId) {
      // User can only view their own tickets unless they're an admin
      const requestedUserId = Number.parseInt(userId, 10)
      if (requestedUserId !== currentUser.id && !currentUser.isAdmin) {
        return NextResponse.json({ error: "Unauthorized. You can only view your own tickets" }, { status: 403 })
      }

      // Get tickets for a specific user
      const tickets = await getTicketsByUser(requestedUserId)
      return NextResponse.json(tickets)
    } else if (adminView) {
      // Admin view - get all open tickets
      if (!currentUser.isAdmin) {
        return NextResponse.json({ error: "Unauthorized. Admin access required" }, { status: 403 })
      }

      const tickets = await getAllOpenTickets()
      return NextResponse.json(tickets)
    } else {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Error fetching support tickets:", error)
    return NextResponse.json({ error: "Failed to fetch support tickets", message: error.message }, { status: 500 })
  }
}

